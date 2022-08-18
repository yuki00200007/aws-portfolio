import "./Concentrate.css";
import cardImg from "./card.png";
import cardBackImg from "./card-back.png";
import { styled } from "@mui/material";

const CardRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "130px",
    height: "160px",
    padding: "10px",
  },
  width: "64px",
  height: "90px",

  "& > div": {
    "& > div": {
      "& > img": {
        [theme.breakpoints.up("md")]: {
          height: "120px",
        },
        height: "100%",
      },
    },
  },
}));

interface CardProps {
  index: number;
  card: string;
  onClickCard: () => void;
  finished: boolean;
  active: boolean;
}

export function Card({
  card,
  onClickCard,
  finished,
  active,
}: CardProps): JSX.Element {
  if (finished) {
    return (
      <CardRoot className="card" onClick={onClickCard}>
        <div className="card-content-finished">
          <img
            alt="cardBack"
            src={cardBackImg}
            style={{
              width: "100%",
            }}
          />
          {card}
        </div>
      </CardRoot>
    );
  }
  return (
    <CardRoot className="card" onClick={onClickCard}>
      <div
        className={
          active ? "card-content-front" : "card-content-front hide-card"
        }
      >
        {card}
      </div>
      <div
        className={active ? "card-content-back hide-card" : "card-content-back"}
      >
        <div className="card-cover">
          <img alt="card" src={cardImg} />
        </div>
      </div>
    </CardRoot>
  );
}
