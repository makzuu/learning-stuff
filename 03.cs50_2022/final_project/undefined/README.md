# Undefined
#### Video Demo:  https://youtu.be/3YKQjP2iD20
#### Description:
Undefined is a web based single player touch typing game. implemented with the HTML CANVAS API.
Which aims to improve your typing speed. through a rain of letters which is your task to DESTROY!!!!!

After several fail zombie experiments. the dr.santa was finally able to create a rudolf zombie army, and is your task to clean
the streets of walalumpur!

So take your favorite custom keyboard and press all the letter at your disposal!

Don't let the santa's army to take control of st.kultrun street walmart!

Just press the keys! everything is gonna be alright.

- Now with more keys to stroke!
- Better player shadow effect!
- A touch typing experience from another world!
- With no music to let you listen every key stroke with the maximum realicism!
- The score moves when the first enemy appears! it's not a bug! it's a feature!
- With the most incredible particle animation!
- I wish i had paid attention in grammar class!
- I have no obsession with exclamation points!
- Your little brother is bothering you? No Problemo amigou just plug the new fake controller (no batteries included) and that little b****rd would think he's doing amazing!

Please! Just let me submit the thing. I want to sleep :c

#### Project distribution:
- In the directory 'js' there are helper functions, key events, and all the classes, the game loop and all the functionality of the game.
- In the directory 'fonts' there are all the fonts used in this project.
- In the directory 'test' there are all the functionalities that were necesary to make the game.
- In the root directory there is 'undefined.html' the entry point to the game.

#### Project Decisions
- Object Oriented Programming:
I choose OOP because was more easy to design elements like a Player, a particle, an Enemy. And because is the default in game development.

- Game simplification:
I had to simplificate the game. Because of the lack of time.

- Web base game:
I decided to make a web base game to don't have to deal with O.S incompatibilities.

#### Quick Start:

```
$ <browser> undefined.html
```

#### Resources:
- MDN canvas api documentation:  
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

- Polar coordinates tutorial:  
https://www.youtube.com/watch?v=O5wjXoFrau4

- Vector Math:  
https://www.youtube.com/watch?v=s6b1_3bNCxk  
https://www.youtube.com/watch?v=uHusbFmq-4I

- Collision Detection:  
https://www.youtube.com/watch?v=uAfw-ko3kB8

#### Helper Functions Documentation:

```javascript
random(min, max)
```

The random function returns a number between min and max inclusive

```javascript
randomNotInclusive(min, max)
```

The randomNotInclusive function returns a number between min and max not inclusive

```javascript
randomAngle()
```

The randomAngle function returns a random angle in radians between -PI and 0

```javascript
isAlpha(letter)
```

The isAlpha function returns a boolean value depending on if the parameter letter
is a valid letter.

```javascript
isInsideCanvas(pos)
```
The isInsideCanvas function returns a boolean value depending on if the parameter 'pos'
is inside the visible canvas.

The parameter 'pos' is an object which fields are x and y. representing a point
in the canvas.
