import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ dogCard }) => {
  //console.log(dogCard.id);
  return (
    <div>
      <Link to={`/detail/${dogCard.id}`} className={style.link}>
        <article className={style.card}>
          <img
            className={style.cardImage}
            src={
              dogCard.image
                ? dogCard.image
                : `https://i.ibb.co/YBfGSN6/image-lobo.png`
            }
            alt={dogCard.name}
          ></img>
          <h2 className={style.cardTitle}>{dogCard.name}</h2>
          <p className={style.cardTypes}>{dogCard.temperaments}</p>
          <p className={style.cardTypes}> {dogCard.weightMin} Kg.</p>
          <p className={style.cardTypes}> {dogCard.weightMax} Kg.</p>
        </article>
      </Link>
    </div>
  );
};

export default Card;
