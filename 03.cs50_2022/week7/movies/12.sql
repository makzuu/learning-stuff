-- Write a SQL query to list the titles of all movies in which both Johnny Depp and Helena Bonham
-- Carter starred.
--
--      Your query should output a table with a single column for the title of each movie.
--      
--      You may assume that there is only one person in the database with the name Johnny Depp.
--
--      You may assume that there is only one person in the database with the name Helena Bonham Carter.

SELECT movies.title
FROM movies
WHERE movies.id IN

(SELECT stars.movie_id
FROM people
JOIN stars
ON people.id = stars.person_id
AND people.name = 'Johnny Depp')

AND movies.id IN

(SELECT stars.movie_id
FROM people
JOIN stars
ON people.id = stars.person_id
AND people.name = 'Helena Bonham Carter')
