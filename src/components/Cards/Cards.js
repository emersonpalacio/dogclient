import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, clearDogsFilters } from "../../redux/actions";
import style from "./Cards.module.css";
import Loader from "../Loader/Loader";
import Paginado from "../Paginado/Paginado";

const Cards = (props) => {
  const dispatch = useDispatch();
  const { allDogs, filteredDogs } = useSelector((state) => state);
  const dogs = filteredDogs.length ? filteredDogs : allDogs;

  useEffect(() => {
    dispatch(getAllDogs());
    return () => dispatch(clearDogsFilters());
  }, [dispatch]);

  //creamos otro estado local para almacenar cuantos personajes quiero por pagina
  const [charactersPerPage /*setCharactersPerPage*/] = useState(12);

  //creamos una constante donde me guardo el indice del ultimo personaje
  const indexOfLastCharacter = props.currentPage * charactersPerPage;

  //declaro otra constante con el indice del primer personaje
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

  //personajes que van a estar en mi pagina actual
  //El slice toma un array y agarra una porcion delo que le pase por parametro(indexOfFirstCharacter, indexOfLastCharacter)
  const currentCharacters = dogs?.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  //declaro una const paginado que recibe un numero de pagina
  //y seteo la pagina en ese numero de pagina
  const paginado = (pageNumber) => {
    props.setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={style.cardContainer}>
        {dogs.length === 0 ? (
          <Loader />
        ) : (
          currentCharacters?.map((dog) => (
            <Card key={dog.id} dogCard={dog}></Card>
          ))
        )}
      </div>
      <Paginado
        charactersPerPage={charactersPerPage}
        dogs={dogs.length}
        paginado={paginado}
      />
    </>
  );
};

export default Cards;
