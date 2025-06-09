// Run an Io program from a file.

Animal := Object clone
Animal say := method("some noise" println)

cat := Animal clone
dog := Animal clone

cat say = method("miau" println)

cat say
dog say

cat proto getSlot("say") println
cat getSlot("say") println
