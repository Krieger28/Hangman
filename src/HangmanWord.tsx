type HangmanWordProps = {
  guessedL: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanWord({ guessedL, wordToGuess, reveal = false }: HangmanWordProps) {


  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility: guessedL.includes(letter) || reveal
                ? "visible"
                : "hidden",
                color: !guessedL.includes(letter) && reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
