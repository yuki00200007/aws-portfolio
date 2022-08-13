import {
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useList } from "react-use";
import { Cards } from "./Cards";
import "./Concentrate.css";

export function Concentrate() {
  const [cards, setCards] = React.useState<string[]>([]);
  useEffect(() => {
    const c = dealCards();
    setCards(c);
  }, []);

  const [started, setStarted] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [activePlayer, setActivePlayer] = React.useState(0);
  const [activeCardIndexes, setActiveCardIndexes] = useList<number>();
  const [finishedCardIndexes, setFinishedCardIndexes] = useList<number>();
  const [player1Points, setPlayer1Points] = React.useState(0);
  const [player2Points, setPlayer2Points] = React.useState(0);
  const [results, setResults] = useList<number>();

  console.log(results);

  const onClickCard = (i: number) => {
    if (!started) {
      setMessage("Click Start to start the game");
      return;
    }
    // do nothing if the card is already active
    if (activeCardIndexes.includes(i)) return;
    if (finishedCardIndexes.includes(i)) return;

    // reset active cards if active cards already 2
    console.log("onClickCard", activeCardIndexes);
    if (activeCardIndexes.length > 1) {
      setActiveCardIndexes.reset();
      // change active player
      setActivePlayer(1 - activePlayer);
      return;
    }

    setActiveCardIndexes.push(i);
    const firstCardIndex = activeCardIndexes[0];
    const firstCard = cards[firstCardIndex];
    const card = cards[i];
    // if the card clicked is the same as the active card
    if (firstCard === card) {
      // if the active player is player 1, add 1 point to player 1
      console.log("firstCard === card");
      setFinishedCardIndexes.push(i);
      setFinishedCardIndexes.push(...activeCardIndexes);
      setActiveCardIndexes.reset();
      if (activePlayer === 0) setPlayer1Points(player1Points + 1);
      else setPlayer2Points(player2Points + 1);
    }
  };

  // add result
  useEffect(() => {
    if (finishedCardIndexes.length === 0) return;
    if (finishedCardIndexes.length === cards.length) {
      if (player1Points > player2Points) {
        setResults.push(0);
      } else if (player1Points < player2Points) {
        setResults.push(1);
      } else {
        setResults.push(-1);
      }
    }
  }, [finishedCardIndexes, player1Points, player2Points]);

  const onRestart = () => {
    setActiveCardIndexes.reset();
    setFinishedCardIndexes.reset();
    setPlayer1Points(0);
    setPlayer2Points(0);
    setActivePlayer(0);
    setMessage("");
  };

  const onStart = () => {
    setStarted(true);
    setMessage("");
  };
  return (
    <div className="container">
      <div style={{ height: "80px" }}></div>
      {started && <span>STARTTED!</span>}
      <div className="message">{message}</div>
      <div className="content-box">
        <Cards
          cards={cards}
          onClickCard={onClickCard}
          activeCardIndexes={activeCardIndexes}
          finishedCardIndexes={finishedCardIndexes}
        />

        <div className="panel">
          <div className="players-bar">
            <div className="player">
              <div className={`${activePlayer === 0 ? "active" : ""}`}>
                Player 1
              </div>
              {started && <div className="point">{player1Points}</div>}
            </div>
            <div className="player">
              <div className={`${activePlayer === 1 ? "active" : ""}`}>
                Player 2
              </div>
              {started && <div className="point">{player2Points}</div>}
            </div>
          </div>
          <TableContainer sx={{ flex: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    {`Player 1 : ${results.filter((res) => res === 0).length}`}
                  </TableCell>
                  <TableCell>
                    {`Player 2 : ${results.filter((res) => res === 1).length}`}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      {row === 0 && "◯"}
                      {row === 1 && "×"}
                      {row === -1 && "-"}
                    </TableCell>
                    <TableCell>
                      {row === 1 && "◯"}
                      {row === 0 && "×"}
                      {row === -1 && "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="btn-bar">
            <div className="start-btn" onClick={onStart}>
              Start
            </div>
            <div className="start-btn" onClick={onRestart}>
              Restart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function dealCards() {
  const xs = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "H",
    "H",
  ];

  // shuffle the cards
  for (let i = xs.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    [xs[i], xs[r]] = [xs[r], xs[i]];
  }
  return xs;
}
