import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import style from "./Home.module.css";
import {
  getAllDogs,
  filterByTemperamets,
  getDogTemperaments,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../../redux/actions";

import Search from "../../components/Search/Search";

const Home = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);

  const handleTemperament = (e) => {
    e.preventDefault();
    dispatch(filterByTemperamets(e.target.value));
    setCurrentPage(1);
  };
  useEffect(() => {
    dispatch(getDogTemperaments());
  }, [dispatch]);

  const handleReload = () => {
    dispatch(getAllDogs());
  };

  const handleFilterCreate = (e) => {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  };

  const handleDortName = (e) => {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
  };
  const handleOrderWeight = (e) => {
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
  };

  //console.log(types);
  return (
    <>
      <Search currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={style.botonContainer}>
        <button onClick={handleReload} className={style.botonReload}>
          !Reload
        </button>
      </div>

      <div className={style.container}>
        <div className={style.containerChild}>
          <h3>Filter By:</h3>
          <label>
            Origin
            <select onChange={(ev) => handleFilterCreate(ev)}>
              <option value="all">All</option>
              <option value="api">Api</option>
              <option value="created">Created</option>
            </select>
          </label>
          <label>
            Temperament
            <select name="temperament" onChange={(ev) => handleTemperament(ev)}>
              <option value="all">All</option>
              {temperaments.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={style.containerChild}>
          <h3>Order By :</h3>
          <label>
            Name
            <select onChange={(e) => handleDortName(e)}>
              <option value="default">Default</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </label>
          <label>
            Weight
            <select onChange={(ev) => handleOrderWeight(ev)}>
              A<option value="default">Default</option>
              <option value="asc">Weight Min</option>
              <option value="desc">Weight Max</option>
            </select>
          </label>
        </div>
      </div>

      <Cards currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Home;
