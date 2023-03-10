import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./wordsList.json";

function getWord() {
  return words[Math.round(Math.random() * words.length)];
}


function App() {
  const [randomWord, setRandomWord] = useState(getWord);

  const [guessedL, setGuessedL] = useState<string[]>([]);

  const incorrectL = guessedL.filter((letter) => !randomWord.includes(letter));

  const IfLoser = incorrectL.length >= 6;

  const IfWinner = randomWord.split("").every(letter => guessedL.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      //the useCallback avoids rendering innecesary times the useeffect
      //because the guessedL being in the brakeds of the usecallback checks if there was a change in guessedL before activating
      //the code inside the useCallback
      if (guessedL.includes(letter) || IfLoser || IfWinner) return;

      setGuessedL((currentL) => [...currentL, letter]);
    },
    [guessedL, IfLoser, IfWinner]
  );

  //useEffect so the keyboard works
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedL]);


//useEffect so when you press the enter btn it restart the game
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault()
      setGuessedL([])
      setRandomWord(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);




  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2.5rem", textAlign: "center" }}>
        {IfLoser && "Haha you LOSE"}
        {IfWinner && "Wow you win!!"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectL.length} />
      <HangmanWord reveal={IfLoser} guessedL={guessedL} wordToGuess={randomWord} />
      <Keyboard
      disabled={IfLoser || IfWinner}
        activeLetters={guessedL.filter((letter) => randomWord.includes(letter))}
        inactiveLetters={incorrectL}
        addGuessedLetter={addGuessedLetter}
      />
    </div>
  );
}

export default App;
