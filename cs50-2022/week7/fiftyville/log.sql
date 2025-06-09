-- Keep a log of any SQL queries you execute as you solve the mystery.

-- July 28, 2021.
-- Humphrey Street.

.tables

.schema crime_scene_reports

SELECT description
    FROM crime_scene_reports
    WHERE street = 'Humphrey Street'
    AND month = 07
    AND day = 28
    AND year = 2021;

/* 
    Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery. Interviews were 
    conducted today with three witnesses who were present at the time – each of their interview 
    transcripts mentions the bakery.
    Littering took place at 16:36. No known witnesses.
*/

-- 10:15 Humphrey Street bakery
-- Littering took place at 16:36

.schema

SELECT name, transcript
    FROM interviews
    WHERE month = 07
    AND day = 28
    AND year = 2021
    AND transcript LIKE '%bakery%';

/*
    Ruth|Sometime within ten minutes of the theft, I saw the thief get into a car in the bakery 
    parking lot and drive away. If you have security footage from the bakery parking lot, you 
    might want to look for cars that left the parking lot in that time frame.

    Eugene|I don't know the thief's name, but it was someone I recognized. Earlier this morning, 
    before I arrived at Emma's bakery, I was walking by the ATM on Leggett Street and saw the 
    thief there withdrawing some money.

    Raymond|As the thief was leaving the bakery, they called someone who talked to them for less 
    than a minute. In the call, I heard the thief say that they were planning to take the earliest 
    flight out of Fiftyville tomorrow. The thief then asked the person on the other end of the 
    phone to purchase the flight ticket.
*/

.schema

SELECT license_plate, activity
    FROM bakery_security_logs
    WHERE month = 07
    AND day = 28
    AND year = 2021
    AND hour = 10
    AND minute BETWEEN 15 AND 25;

-- license_plate of the cars who were in the bakery parking between 10:15 and 10:25

/*
    5P2BI95|exit
    94KL13X|exit
    6P58WS2|exit
    4328GD8|exit
    G412CB7|exit
    L93JTIZ|exit
    322W7JE|exit
    0NTHK55|exit
*/

-- name, phone_number, passport_number of the people who were in the bakery parking between 10:15 
-- and 10:25

SELECT name, phone_number, passport_number
    FROM people
    WHERE license_plate IN
        (SELECT license_plate
        FROM bakery_security_logs
        WHERE month = 07
        AND day = 28
        AND year = 2021
        AND hour = 10
        AND minute BETWEEN 15 AND 25);

/*
    Vanessa|(725) 555-4692|2963008352
    Barry|(301) 555-4174|7526138472
    Iman|(829) 555-5269|7049073643
    Sofia|(130) 555-0289|1695452385
    Luca|(389) 555-5198|8496433585
    Diana|(770) 555-1861|3592750733
    Kelsey|(499) 555-9472|8294398571
    Bruce|(367) 555-5533|5773159633
*/

.schema

-- account_number, amount of all transactions commited the day of the theft in Leggett Street

SELECT account_number, amount
    FROM atm_transactions
    WHERE atm_location = 'Leggett Street'
    AND year = 2021
    AND month = 07
    AND day = 28
    AND transaction_type = 'withdraw';

/*
    28500762|48
    28296815|20
    76054385|60
    49610011|50
    16153065|80
    25506511|20
    81061156|30
    26013199|35
*/

-- name, phone_number, passport_number, license_plate of all people who withdraw some money
-- the day of the theft in the atm of Legget Street

SELECT people.name, phone_number, passport_number, license_plate
    FROM people
    JOIN bank_accounts
    ON people.id = bank_accounts.person_id
    AND account_number IN

        (SELECT account_number
            FROM atm_transactions
            WHERE atm_location = 'Leggett Street'
            AND year = 2021
            AND month = 07
            AND day = 28
            AND transaction_type = 'withdraw');

/* 
    Bruce|(367) 555-5533|5773159633|94KL13X
    Diana|(770) 555-1861|3592750733|322W7JE
    Brooke|(122) 555-4581|4408372428|QX4YZN3
    Kenny|(826) 555-1652|9878712108|30G67EN
    Iman|(829) 555-5269|7049073643|L93JTIZ
    Luca|(389) 555-5198|8496433585|4328GD8
    Taylor|(286) 555-6063|1988161715|1106N58
    Benista|(338) 555-6650|9586786673|8X428L0
*/

.schema

SELECT caller, receiver
    FROM phone_calls
    WHERE year = 2021
    AND month = 07
    AND day = 28
    AND duration < 60
    AND caller IN
    
        (SELECT people.phone_number
            FROM people
            JOIN bank_accounts
            ON people.id = bank_accounts.person_id
            AND account_number IN

                (SELECT account_number
                    FROM atm_transactions
                    WHERE atm_location = 'Leggett Street'
                    AND year = 2021
                    AND month = 07
                    AND day = 28
                    AND transaction_type = 'withdraw'));

/*
    (367) 555-5533|(375) 555-8161
    (286) 555-6063|(676) 555-6554
    (770) 555-1861|(725) 555-3243
    (826) 555-1652|(066) 555-9701
    (338) 555-6650|(704) 555-2131
*/

SELECT name
    FROM people
    WHERE phone_number IN
        (SELECT caller
            FROM phone_calls
            WHERE year = 2021
            AND month = 07
            AND day = 28
            AND duration < 60
            AND caller IN
            
                (SELECT people.phone_number
                    FROM people
                    JOIN bank_accounts
                    ON people.id = bank_accounts.person_id
                    AND account_number IN

                        (SELECT account_number
                            FROM atm_transactions
                            WHERE atm_location = 'Leggett Street'
                            AND year = 2021
                            AND month = 07
                            AND day = 28
                            AND transaction_type = 'withdraw')));

-- callers
/*
    Kenny
    Benista
    Taylor
    Diana
    Bruce
*/

SELECT name
    FROM people
    WHERE phone_number IN
        (SELECT receiver
            FROM phone_calls
            WHERE year = 2021
            AND month = 07
            AND day = 28
            AND duration < 60
            AND caller IN
            
                (SELECT people.phone_number
                    FROM people
                    JOIN bank_accounts
                    ON people.id = bank_accounts.person_id
                    AND account_number IN

                        (SELECT account_number
                            FROM atm_transactions
                            WHERE atm_location = 'Leggett Street'
                            AND year = 2021
                            AND month = 07
                            AND day = 28
                            AND transaction_type = 'withdraw')));

-- receivers
/*
    James
    Anna
    Philip
    Robin
    Doris
*/

.schema

SELECT full_name
    FROM airports
    WHERE city LIKE 'fiftyville';

-- Fiftyville Regional Airport

SELECT passport_number
    FROM passengers
    WHERE flight_id = 
        (SELECT flights.id
            FROM flights
            JOIN airports
            ON flights.origin_airport_id = airports.id
            AND flights.day = 29
            AND airports.full_name = 'Fiftyville Regional Airport'
            ORDER BY flights.hour
            LIMIT 1)

/*
    7214083635
    1695452385
    5773159633
    1540955065
    8294398571
    1988161715
    9878712108
    8496433585
*/

SELECT name
    FROM people
    WHERE passport_number IN

        (SELECT passport_number
            FROM passengers
            WHERE flight_id = 
                (SELECT flights.id
                    FROM flights
                    JOIN airports
                    ON flights.origin_airport_id = airports.id
                    AND flights.day = 29
                    AND airports.full_name = 'Fiftyville Regional Airport'
                    ORDER BY flights.hour
                    LIMIT 1))

-- thief car goes brrrr
-- withdraw
-- call
-- flight

SELECT id
    FROM people
    WHERE passport_number IN

        (SELECT passport_number
            FROM passengers
            WHERE flight_id = 
                (SELECT flights.id
                    FROM flights
                    JOIN airports
                    ON flights.origin_airport_id = airports.id
                    AND flights.day = 29
                    AND airports.full_name = 'Fiftyville Regional Airport'
                    ORDER BY flights.hour
                    LIMIT 1))
    AND id IN

        (SELECT id
            FROM people
            WHERE license_plate IN
                (SELECT license_plate
                FROM bakery_security_logs
                WHERE month = 07
                AND day = 28
                AND year = 2021
                AND hour = 10
                AND minute BETWEEN 15 AND 25))
    AND id IN

        (SELECT people.id
            FROM people
            JOIN bank_accounts
            ON people.id = bank_accounts.person_id
            AND account_number IN
        
                (SELECT account_number
                    FROM atm_transactions
                    WHERE atm_location = 'Leggett Street'
                    AND year = 2021
                    AND month = 07
                    AND day = 28
                    AND transaction_type = 'withdraw'))
    AND id IN 
        (SELECT id
            FROM people
            WHERE phone_number IN
                (SELECT caller
                    FROM phone_calls
                    WHERE year = 2021
                    AND month = 07
                    AND day = 28
                    AND duration < 60
                    AND caller IN
                    
                        (SELECT people.phone_number
                            FROM people
                            JOIN bank_accounts
                            ON people.id = bank_accounts.person_id
                            AND account_number IN
    
                                (SELECT account_number
                                    FROM atm_transactions
                                    WHERE atm_location = 'Leggett Street'
                                    AND year = 2021
                                    AND month = 07
                                    AND day = 28
                                    AND transaction_type = 'withdraw'))))

-- 686048

SELECT name
    FROM people
    WHERE id = 686048
    OR phone_number =
        (SELECT receiver
            FROM phone_calls
            WHERE year = 2021
            AND month = 07
            AND day = 28
            AND duration < 60
            AND caller =
                (SELECT phone_number
                    FROM people
                    WHERE id = 686048));

/*
    Bruce
    Robin
*/

SELECT airports.city
    FROM airports
    JOIN flights
    ON airports.id = flights.destination_airport_id
    JOIN passengers
    ON flights.id = passengers.flight_id
    JOIN people
    ON passengers.passport_number = people.passport_number
    AND people.id = 686048;

-- New York City
