-- CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT NOT NULL, hash TEXT NOT NULL, cash NUMERIC NOT NULL DEFAULT 10000.00);
-- CREATE TABLE sqlite_sequence(name,seq);
-- CREATE UNIQUE INDEX username ON users (username);

-- CREATE TABLE symbols (
--     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
--     symbol TEXT NOT NULL,
--     name TEXT NOT NULL
-- );
-- 
-- CREATE TABLE operations (
--     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
--     operation TEXT NOT NULL
-- );
-- 
-- CREATE TABLE transactions (
--     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
--     time TEXT NOT NULL,
--     shares NUMERIC NOT NULL,
--     price NUMERIC NOT NULL,
--     user_id INTEGER NOT NULL,
--     symbol_id INTEGER NOT NULL,
--     operation_id INTEGER NOT NULL,
--     FOREIGN KEY(user_id) REFERENCES users(id),
--     FOREIGN KEY(symbol_id) REFERENCES symbols(id)
--     FOREIGN KEY(operation_id) REFERENCES operations(id)
-- );
-- 
INSERT INTO users (username, hash) VALUES ("makz", "pbkdf2:sha256:260000$Vv6mlxlJ05dSaihl$ddf53f8c94d4bcce671ef56d8cb230e0a0613c2613e44666168a80d4d4933647");
INSERT INTO operations (operation) VALUES ("buy");
INSERT INTO operations (operation) VALUES ("sell");
