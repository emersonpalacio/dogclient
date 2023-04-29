import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getDogTemperaments, postDogs } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./Form.module.css";

const validate = (state) => {
  const error = {};

  if (!state.name.length || state.name.length > 15) {
    error.name = "Name must be between 1 and 15 characters!";
  }

  if (state.image && !/^http.+.\.(jpg|jpeg|gif|png|webp)$/.test(state.image)) {
    error.image = "Invalid image!";
  }
  if (state.life_span < 1 || state.life_span > 255) {
    error.life_span = "Life_spant must be between 1 and 255!";
  }

  if (state.breed_group < 1 || state.breed_group > 255) {
    error.breed_group = "Breed_group must be between 1 and 255!";
  }
  if (state.defense < 1 || state.defense > 255) {
    error.defense = "Defense must be between 1 and 255!";
  }
  if (state.speed < 0 || state.speed > 255) {
    error.speed = "Speed must be between 0 and 255!";
  }
  if (state.weightMax < 0 || state.weightMax > 255) {
    error.weightMax = "Weight must be between 0 and 255!";
  }
  if (state.heightMax < 0 || state.heightMax > 255) {
    error.heightMax = "heightMax must be between 0 and 255!";
  }
  if (state.temperaments.length > 2 || state.temperaments.length < 1) {
    error.temperaments = "You must choose one or two temperaments!";
  }
  return error;
};

const initialState = {
  name: "",
  heightMin: "",
  heightMax: "",
  weightMin: "",
  weightMax: "",
  life_span: "",
  temperaments: [],
};

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const temperaments = useSelector((state) => state.temperaments);

  //me creo un estado local donde me guarde la info del formulario
  //ese estado inicial va a ser un objeto con las props que necesita el POST
  const [input, setInput] = useState(initialState);

  const [touch, setTouch] = useState({});

  const errors = validate(input);

  const isFormValid = Object.keys(errors).length === 0;

  //manja mis cambios en los inputs
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const convertToNumber =
      name !== "image" &&
      name !== "name" &&
      name !== "temperaments" &&
      name !== "  life_span";

    setInput({
      ...input,
      [name]: convertToNumber ? Number(value) : value,
    });
  };

  const handleSelect = (ev) => {
    if (!input.temperaments.includes(ev.target.value)) {
      setInput({
        ...input,
        //cuando elija el type, me tre todo y concatena el target valuye
        //Va agregando en un array todo lo que va seleccionando
        temperaments: [...input.temperaments, ev.target.value],
      });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (isFormValid) {
      dispatch(postDogs(input));
      alert("Dogs created successfully!");
      //reinicio el form
      setInput(initialState);
      //useHistory, te redirige a la ruta que yo le diga
      history.push("/home");
    }
  };

  const handleDeleteType = (elem) => {
    //traigo una copya del estadoinput y lo mapeo para quedarme con los typos distintos al que me manda el evento
    const filterDelete = input.temperaments.filter((type) => type !== elem);

    //seteo el estado input
    setInput({
      ...input,
      temperaments: filterDelete,
    });
  };

  const handleBlur = (ev) => {
    setTouch({
      ...touch,
      [ev.target.name]: true,
    });
  };

  //hace un dispatch para los types
  //cuando se monte el componente que traiga los types
  useEffect(() => {
    dispatch(getDogTemperaments());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <h2>CREATE YOUR DOG!</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            value={input.name}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touch.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            value={input.image || ""}
            id="image"
            name="image"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.image && touch.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label htmlFor="life_span">life_span:</label>
          <input
            min={1}
            max={255}
            type="number"
            required
            value={input.life_span}
            id="life_span"
            name="life_span"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.life_span && touch.life_span && <p>{errors.life_span}</p>}
        </div>
        <div>
          <label htmlFor="heightMin">HeightMin:</label>
          <input
            min={1}
            max={255}
            type="number"
            required
            value={input.heightMin}
            id="heightMin"
            name="heightMin"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.heightMin && touch.heightMin && <p>{errors.heightMin}</p>}
        </div>
        <div>
          <label htmlFor="heightMax">heightMax:</label>
          <input
            min={1}
            max={255}
            type="number"
            required
            value={input.heightMax}
            id="heightMax"
            name="heightMax"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.heightMax && touch.heightMax && <p>{errors.heightMax}</p>}
        </div>
        <div>
          <label htmlFor="weightMin">weightMin:</label>
          <input
            min={1}
            max={255}
            type="number"
            required
            value={input.weightMin}
            id="weightMin"
            name="weightMin"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.weightMin && touch.weightMin && <p>{errors.weightMin}</p>}
        </div>
        <div>
          <label htmlFor="weightMax">weightMin:</label>
          <input
            min={1}
            max={255}
            type="number"
            required
            value={input.weightMax}
            id="weightMax"
            name="weightMax"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.weightMax && touch.weightMax && <p>{errors.weightMax}</p>}
        </div>

        <label>
          Temperaments
          <select
            name="filterByTemperament"
            onChange={handleSelect}
            disabled={input.temperaments.length >= 2}
            onBlur={handleBlur}
          >
            <option value="all">All</option>
            {temperaments.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.temperaments && touch.temperaments && (
            <p className={style.errorType}>{errors.temperaments}</p>
          )}
        </label>
        <ul>
          {input.temperaments.map((elem) => (
            <li key={elem} className={style.listaTypes}>
              {elem}
              <button
                className={style.delete}
                type="button"
                onClick={() => handleDeleteType(elem)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <button className={style.create} type="submit" disabled={!isFormValid}>
          CREATE
        </button>
      </form>
    </div>
  );
};

export default Form;
