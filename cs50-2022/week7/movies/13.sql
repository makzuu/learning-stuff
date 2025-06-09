-- Write a SQL query to list the names of all people who starred in a movie in which Kevin Bacon
-- also starred.
--
--      Your query should output a table with a single column for the name of each person.
--
--      There may be multiple people named Kevin Bacon in the database. Be sure to only select the
--      Kevin Bacon born in 1958.
--
--      Kevin Bacon himself should not be included in the resulting list.

SELECT people.name
FROM people
JOIN stars
ON people.id = stars.person_id
AND stars.movie_id IN

(SELECT stars.movie_id
    FROM stars
    JOIN people
    ON people.id = stars.person_id
    AND people.name = 'Kevin Bacon'
    AND people.birth = 1958)

AND people.id !=
(SELECT id
    FROM people
    WHERE name = 'Kevin Bacon'
    AND birth = 1958)
