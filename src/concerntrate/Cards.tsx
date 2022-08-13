import "./Concentrate.css";
import cardImg from "./card.png";
import cardBackImg from "./card-back.png";

interface CardsProps {
  cards: string[];
  onClickCard: (i: number) => void;
  activeCardIndexes: number[];
  finishedCardIndexes: number[];
}

export function Cards({
  cards,
  onClickCard,
  activeCardIndexes,
  finishedCardIndexes,
}: CardsProps): JSX.Element {
  return (
    <div className="cards">
      {cards.map((card, i) => (
        <div className="card" key={i} onClick={() => onClickCard(i)}>
          {finishedCardIndexes.includes(i) ? (
            <div className="card-content-finished">
              <img
                src={cardBackImg}
                style={{
                  width: "100%",
                }}
              />
              {card}
            </div>
          ) : (
            <div className="card-content">
              {activeCardIndexes.includes(i) ? (
                card
              ) : (
                <img
                  src={cardImg}
                  style={{
                    height: "100%",
                  }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
