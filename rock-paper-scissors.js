require('dotenv').config();

const SpeechToText = require('google-speech-from-buffer');
const MicToSpeech = require('mic-to-speech');
const say = require('say');

const micToSpeech = new MicToSpeech();

const LANGUAGE = process.env.LANGUAGE || 'en-US';

// On Mac OS, use `say -v '?'` in the terminal and pick a voice matching the language
const VOICE = process.env.VOICE || 'Alex';

const speechToTextConfig = { languageCode: LANGUAGE };

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

async function saySomething(something) {
  console.log(something);
  return new Promise((resolve) => {
    say.speak(something, VOICE, 1.2, (err) => {
      if (err) {
        console.log(err);
      }
      resolve();
    });
  });
}

async function listen(speechContext = {}, callback) {
  micToSpeech.on('speech', (buffer) => {
    console.log('Heard something. Analyzing ...');
    micToSpeech.pause();
    new SpeechToText({ ...speechToTextConfig, speechContexts: [speechContext] })
      .recognize(buffer)
      .then((statement) => callback(statement));
  });

  micToSpeech.start();
}

async function play(playerAnswer) {
  playerAnswer = playerAnswer || '';
  playerAnswer = playerAnswer.toLowerCase().trim();

  if (!playerAnswer) {
    await saySomething('What did you say?');
    micToSpeech.resume();
    return;
  }

  console.log(`Player answer: ${playerAnswer}`);

  if (
    playerAnswer != ROCK &&
    playerAnswer != PAPER &&
    playerAnswer != SCISSORS
  ) {
    await saySomething(`I didn't get it. What did you say?`);
    micToSpeech.resume();
    return;
  }

  const computerAnswer = rockPaperOrScissors();
  await saySomething(`I play ${computerAnswer}`);
  if (playerAnswer == computerAnswer) {
    await draw();
    await saySomething('Your turn!');
    micToSpeech.resume();
    return;
  }

  if (playerAnswer === ROCK) {
    if (computerAnswer === PAPER) {
      await computerWon();
    } else if (computerAnswer === SCISSORS) {
      await playerWon();
    }
  } else if (playerAnswer === PAPER) {
    if (computerAnswer === ROCK) {
      await playerWon();
    } else if (computerAnswer === SCISSORS) {
      await computerWon();
    }
  } else if (playerAnswer === SCISSORS) {
    if (computerAnswer === ROCK) {
      await computerWon();
    } else if (computerAnswer === PAPER) {
      await playerWon();
    }
  }

  await checkScore();

  await saySomething('Your turn!');

  micToSpeech.resume();
}

function rockPaperOrScissors() {
  const items = [ROCK, PAPER, SCISSORS];
  return items[Math.floor(Math.random() * items.length)];
}

async function computerWon() {
  await saySomething('I won!');
  computerScore++;
}

async function playerWon() {
  await saySomething('You won!');
  playerScore++;
}

async function draw() {
  await saySomething('Draw!');
}

async function checkScore() {
  await saySomething(`You have ${playerScore}, me ${computerScore}.`);

  if (playerScore == 3) {
    await saySomething(`You won the game! Congrats!`);
    process.exit();
  }

  if (computerScore == 3) {
    await saySomething(`I won the game!`);
    process.exit();
  }
}

let playerScore = 0;
let computerScore = 0;

async function start() {
  await saySomething('Hello! Rock? Paper? Or scissors ...');

  listen({ phrases: [ROCK, PAPER, SCISSORS] }, play);
}

start();
