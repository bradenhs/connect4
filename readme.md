## Connect 4

Connect 4 with a twist: Instead, of playing someone directly write a program to play for you. This repository is the client for the computer player(s) you will build. See the live client here: http://connect4.surge.sh

## How to Play

1. Code up a server that accepts a POST with JSON in this form:

```json
{
  "moves": [0, 1, 2, 3]
}
```

2. And returns JSON in this form:

```json
{
  "nextMove": 4,
  "message": "That that!" // optional
}
```

3. Then, enter the full URLs for the programs you'd like to play each other and press the "Start Game" button!

## Tips and Tricks

- A "move" is a number 0-6. 0 for the leftmost column and 6 for the rightmost.
- The first player to move is always player 1.
- You'll probably want to transform the list of moves into some type of board object so your program can easily reason about it.
- Don't make any illegal moves! You'll lose.
- Don't forget about CORS.
- Want to see a game without coding anything? Enter the word **random** into the URL input.

## Running the Client Locally

1. `git clone git@github.com:bradenhs/connect4.git`
2. `cd connect4`
3. `npm install`
4. `npm start`
5. it should be running in dev mode (live reload enabled, tests running, etc.) at http://localhost:8080

If you'd like to see a simple working server checkout `src/computers/random.ts`. Run it with this command: `npm run random-computer`
