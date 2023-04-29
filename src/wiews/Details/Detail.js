import { getDogDetail } from "../../redux/actions";
import { useEffect, useState } from "react";

import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./Details.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dogs = useSelector((state) => state.detail);

  const [zoom, setZoom] = useState(false);
  function handleZoom() {
    setZoom(!zoom);
  }

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  if (!dogs.image && !dogs.id && !dogs.name) return <Loader />;

  return (
    <div className={style.card1}>
      <article className={style.card}>
        <p className={style.cardId}>
          <span>Id:</span>
          {dogs.id}
        </p>

        <img
          src={dogs.image}
          alt="dogs"
          className={zoom ? style.zoom : style.card}
          onClick={handleZoom}
        />

        <h2 className={style.cardTitle}>{dogs.name}</h2>
        <div className={style.containerParrafos}>
          <p className={style.parrafos}>
            <span>HeightMin:</span>
            {dogs.heightMin}
          </p>
          <p className={style.parrafos}>
            <span>HeightMax:</span>
            {dogs.heightMax}
          </p>
          <p className={style.parrafos}>
            <span>WeightMin:</span>
            {dogs.weightMin}
          </p>
          <p className={style.parrafos}>
            <span> WeightMax:</span>
            {dogs.weightMax}
          </p>
          <p className={style.parrafos}>
            <span>Life_span:</span>
            {dogs.life_span}
          </p>
          <p className={style.parrafos}>
            <span>Breed_group:</span>
            {dogs.breed_group}
          </p>
          <p className={style.cardContent}>
            <span>Temperaments:</span>
            {dogs.temperaments}
          </p>
        </div>
      </article>
    </div>
  );
};

export default Detail;
