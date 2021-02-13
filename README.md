# Rock Paper Scissors

Educational game for programming beginners written in Javascript for Node.js.

Use Google Cloud "Speech to Text" for input and system "Text to Speech" as output.

## Install

1. Clone this repository, then `npm install`

2. Follow the "Google Service Account key" instructions and set `GOOGLE_APPLICATION_CREDENTIALS` in your `.env` file.

3. Execute with `node rock-paper-scissors.js`

## Google Service Account key

To use Google Speech APIs you must have your api turned on with billing enabled. Walking through the quick start and running example code is the best way to make sure this is set up properly

https://cloud.google.com/speech/docs/getting-started

Once you have competed this, you can create your Service Account Key JSON file default credentials with the appropriate access here:

https://console.cloud.google.com/apis/credentials

Once you save your JSON file to disk, you then must export it so your application can use it.

Create or edit the `.env` file and add `GOOGLE_APPLICATION_CREDENTIALS` as an absolute path:

```
GOOGLE_APPLICATION_CREDENTIALS=/whereEver/yourKeyFile.json
```

## Hacking Ideas

- Translate the program in your own language
- Internationalize the program so it's easy to translate
- Change game mechanics: rock-paper-scissors-lizard-Spock
- Ask players their name and use it in the voice output
- Simplify the program so it's easier to understand for programming beginners
