# bee on STEM
Project repository for VenusHack 2023 hackathon

Written by:
- Lillian Ling
- Alexandra Zhang Jiang 


## Inspiration
Did you know that the [EECS department at UCI has a total of 17% female undergraduate students](https://engineering.uci.edu/dept/eecs/facts-figures)?! As two women in this field, we have definitely noticed the struggle!!

We address the issue at its root, middle and high schoolers. We hope that from a young age, people can learn about and get inspired by all the awesome women who have contributed to Science, Technology, Engineering, and Mathematics (STEM) in a fun and interactive way. We want to encourage you to BEE in STEM ;D


## What it does
Play as a bee and collect “pollen” (letters) to find a “flower” (name of a woman in STEM)! Once you get all the letters to a name, you can stop and learn about their contributions to the world. Names are randomized, so you can keep playing and learning!


## How we built it
This was made purely in HTML, CSS, and Javascript. We also had a JSON file containing information about women in STEM. 

The game mechanics start by picking a random woman in the JSON file. Then, we sequentially display the letters of the matched woman’s name on the game board for the bee to find. Once all the letters have been collected, we display a summary of her contributions. If the bee bumps into one of the game board borders or itself, then the game ends and you can try again.

- JSON file was taken and modified from [Women Who've Changed Tech
API & React App by kwing25](https://github.com/kwing25/Women-Who-ve-Changed-Tech)
- Youtube [video](https://www.youtube.com/watch?v=Je0B3nHhKmM) on snake game mechanics


## Challenges we ran into
There were a lot of challenges for us because we have little to no experience with high-level website programming. We have been fishing register addresses from microcontroller datasheets and writing machine code.

Jokes aside, some challenges we had were: 
- Finding an API. The APIs available were either limited or still under development. So we decided to stick to a JSON file.
- Learning the syntax for JavaScript.
- Aligning elements and graphics. It was painful.


## Accomplishments that we're proud of
That the web browser game runs! Now we can say that we do in fact have experience with high-level website programming! 


## What we learned
We had fun learning about:
- Game mechanics for a “snake game”
- Centering elements and graphics
- Git 
- That there is a VS extension to view HTML changes live
- That your code can have emojis


## What's next for bee in STEM
bee in STEM can go in all sorts of directions!
- We could develop the “game” aspect of it further and add more elements in terms of gameplay. Like using our embedded systems knowledge to integrate an IMU module to physically control the bee with the palm of your hand! 
- After “obtaining” each person, we could create a log of names and information that popped up from playing multiple iterations of the game
- We could always beautify and really have fun with formatting and styling

