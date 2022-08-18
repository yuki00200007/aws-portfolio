import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useList } from "react-use";
import { Card } from "./Card";
import "./Concentrate.css";

const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
  display: "revert",

  "& .cards": {
    width: "100%",
    paddingTop: "80px"
  },
}));

export function Concentrate(): JSX.Element {
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
  const [results, setResults] = useList<{ player1: number; player2: number }>();

  const [resultDialog, setResultDialog] = React.useState<number | null>(null);

  const onClickCard = (i: number) => {
    if (!started) {
      setMessage("Click Start to start the game");
      return;
    }
    // do nothing if the card is already active
    if (activeCardIndexes.includes(i)) return;
    if (finishedCardIndexes.includes(i)) return;

    // reset active cards if active cards already 2
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
    if (resultDialog) return;
    if (finishedCardIndexes.length === cards.length) {
      setResults.push({
        player1: player1Points,
        player2: player2Points,
      });
      if (player1Points > player2Points) {
        setResultDialog(0);
      } else if (player1Points < player2Points) {
        setResultDialog(1);
      } else {
        setResultDialog(-1);
      }
    }
  }, [
    finishedCardIndexes,
    player1Points,
    player2Points,
    cards.length,
    resultDialog,
    setResults,
  ]);

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

  const player1WonCount = results.filter((r) => r.player1 > r.player2).length;
  const player2WonCount = results.filter((r) => r.player1 < r.player2).length;

  return (
    <div className="container">
      <div
        style={{
          width: "100%",
          height: "80px",
        }}
      ></div>
      {started && <span>STARTTED!</span>}
      <div className="message">{message}</div>
      <Root className="content-box">
        <Box className="cards">
          {cards.map((card, i) => (
            <Card
              key={i}
              index={i}
              card={card}
              onClickCard={() => onClickCard(i)}
              finished={finishedCardIndexes.includes(i)}
              active={activeCardIndexes.includes(i)}
            />
          ))}
        </Box>

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
          <Hidden smDown>
            <TableContainer sx={{ flex: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{`Player 1 : ${player1WonCount}`}</TableCell>
                    <TableCell>{`Player 2 : ${player2WonCount}`}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        {row.player1 > row.player2 && "◯"}
                        {row.player1 < row.player2 && "×"}
                        {row.player1 === row.player2 && "-"}({row.player1})
                      </TableCell>
                      <TableCell>
                        {row.player1 < row.player2 && "◯"}
                        {row.player1 > row.player2 && "×"}
                        {row.player1 === row.player2 && "-"}({row.player2})
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Hidden>
          <div className="btn-bar">
            <div className="start-btn" onClick={onStart}>
              Start
            </div>
            <div className="start-btn" onClick={onRestart}>
              Restart
            </div>
          </div>

          <Dialog
            open={resultDialog !== null}
            onClose={() => setResultDialog(null)}
          >
            <DialogTitle>
              {resultDialog === 0 && "Player 1 の勝ち！"}
              {resultDialog === 1 && "Player 2 の勝ち！"}
              {resultDialog === -1 && "引き分け！"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setResultDialog(null)} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Root>
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
