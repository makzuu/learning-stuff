import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.security import check_password_hash, generate_password_hash

import time

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""

    user_id = session['user_id']

    info = db.execute("""SELECT symbols.symbol, symbols.name, transactions.shares, operations.operation
        FROM transactions
        JOIN symbols
        ON transactions.symbol_id = symbols.id
        JOIN users
        ON transactions.user_id = users.id
        JOIN operations
        ON transactions.operation_id = operations.id
        AND users.id = ?
        ORDER BY symbols.symbol
                      """, user_id)

    user_cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)[0]["cash"]

    filtered_info = []

    prev = None
    for i in info:
        if i["symbol"] == prev:
            if i["operation"] == "buy":
                filtered_info[-1]["shares"] += i["shares"]
            else:
                filtered_info[-1]["shares"] -= i["shares"]
        else:
            i["price"] = lookup(i["symbol"])["price"]
            filtered_info.append(i)
        prev = filtered_info[-1]["symbol"]

    filtered_info.append({"cash": user_cash})

    return render_template("index.html", info=filtered_info)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "GET":
        return render_template("buy.html")
    else:
        symbol = request.form.get("symbol")
        if not symbol:
            return apology("missing symbol")

        value = lookup(symbol)
        if not value:
            return apology("invalid symbol")

        shares = request.form.get("shares")
        if not shares:
            return apology("missing shares")
        if not shares.isnumeric():
            return apology("invalid shares")
        shares = int(shares)

        if shares < 1:
            return apology("invalid shares")

        user_id = session["user_id"]
        user = db.execute("SELECT * FROM users WHERE id = ?", user_id)[0]

        if (value["price"] * shares) >= user["cash"]:
            return apology("can't afford")

        symbols = db.execute("SELECT * FROM symbols WHERE symbol = ?", value["symbol"])

        symbol_id = None
        if not symbols:
            symbol_id = db.execute("INSERT INTO symbols (symbol, name) VALUES (?, ?)", value["symbol"], value["name"])

        if not symbol_id:
            symbol_id = symbols[0]["id"]

        time_now = time.localtime()
        time_string = time.strftime("%Y-%m-%d %H:%M:%S", time_now)

        operation_id = db.execute("SELECT id FROM operations WHERE operation = ?", "buy")[0]["id"]

        db.execute("INSERT INTO transactions (time, shares, price, user_id, symbol_id, operation_id) VALUES (?, ?, ?, ?, ?, ?)",
                   time_string, shares, value["price"], user_id, symbol_id, operation_id)

        db.execute("UPDATE users SET cash = ? WHERE id = ?", user["cash"] - value["price"] * shares, user_id)
 
        return redirect("/")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""

    user_id = session["user_id"]
    
    history = db.execute("""
        SELECT symbols.symbol, transactions.shares, transactions.price, transactions.time, operations.operation
        FROM transactions
        JOIN symbols
        ON transactions.symbol_id = symbols.id
        JOIN operations
        ON transactions.operation_id = operations.id
        AND transactions.user_id = ?
    """, user_id)

    return render_template("history.html", history=history)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""

    if request.method == "GET":
        return render_template("quote.html")
    else:
        symbol = request.form.get("symbol")
        if not symbol:
            return apology("must provide symbol")

        value = lookup(symbol)
        if not value:
            return apology("invalid symbol")

        return render_template("quoted.html", value=value)


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "GET":
        return render_template("register.html")
    else:
        username = request.form.get("username")
        if not username:
            return apology("must provide username")

        exists = db.execute("SELECT * FROM users WHERE username=?", username)
        if exists:
            return apology("username already taken")

        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        if not password:
            return apology("must provide password")
        if not confirmation:
            return apology("must provide confirmation")
        if password != confirmation:
            return apology("password and confirmation must be equal")

        pass_hash = generate_password_hash(password)
        
        user_id = db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", username, pass_hash)

        session["user_id"] = user_id

        return redirect("/")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""

    if request.method == "POST":
        symbol_id = request.form.get("symbol")
        if not symbol_id:
            return apology("missing symbol")

        user_id = session["user_id"]

        symbol_and_cash = db.execute("""
            SELECT SUM(transactions.shares) as total_shares, symbols.symbol, users.cash FROM transactions
            JOIN operations
            ON transactions.operation_id
            JOIN symbols
            ON transactions.symbol_id = symbols.id
            JOIN users
            ON transactions.user_id = users.id
            AND symbol_id = ?
            AND operations.operation = "buy"
            AND transactions.user_id = ?
        """, symbol_id, user_id)[0]

        avaiable_shares = symbol_and_cash["total_shares"]

        if not avaiable_shares:
            return apology("invalid symbol")

        shares = request.form.get("shares")
        if not shares:
            return apology("missing shares")
        if not shares.isnumeric():
            return apology("invalid shares")
        shares = int(shares)
        if shares < 1:
            return apology("invalid shares")

        if shares > avaiable_shares:
            return apology("too many shares")

        time_now = time.localtime()
        time_string = time.strftime("%Y-%m-%d %H:%M:%S", time_now)

        price = lookup(symbol_and_cash["symbol"])["price"]

        operation_id = db.execute("""
            SELECT id FROM operations
            WHERE operation = "sell"
        """)[0]["id"]

        db.execute("""
            INSERT INTO transactions (time, shares, price, user_id, symbol_id, operation_id)
            VALUES (?, ?, ?, ?, ?, ?)
        """, time_string, shares, price, user_id, symbol_id, operation_id)

        db.execute("""
            UPDATE users SET cash = ?
            WHERE id = ?
        """, symbol_and_cash["cash"] + price * shares, user_id)

    else:
        user_id = session["user_id"]
        symbols = db.execute("""
            SELECT DISTINCT symbols.symbol, symbols.id
            FROM transactions
            JOIN symbols
            ON transactions.symbol_id = symbols.id
            AND user_id = ?
        """, user_id)
        
        return render_template("sell.html", symbols=symbols)

    return redirect("/")
