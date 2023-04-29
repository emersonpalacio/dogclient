import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./Search.module.css";
import { getDogByName } from "../../redux/actions";

const Search = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInpuutChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogByName(name));
    props.setCurrentPage(1);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className={style.searchBar}>
      <input
        type="text"
        onChange={(e) => handleInpuutChange(e)}
        placeholder="NAME..."
        value={name}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        SEARCH
      </button>
    </form>
  );
};

export default Search;
