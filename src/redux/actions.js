import {
  GET_ALL_DOGS,
  CLEAR_DOGS_FILTERS,
  GET_DOGS_DETAIL,
  GET_DOG_BY_NAME,
  FILTER_BY_TEMPEREMENTS,
  GET_DOGS_TEMPEREMENTS,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
} from "./actionTypes";
import axios from "axios";

export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/dogs");
      dispatch({
        type: GET_ALL_DOGS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const clearDogsFilters = () => {
  return {
    type: CLEAR_DOGS_FILTERS,
  };
};

export const getDogDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/dogs/${id}`);
      dispatch({
        type: GET_DOGS_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDogByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/dogs?name=${name}`);
      return dispatch({
        type: GET_DOG_BY_NAME,
        payload: data,
      });
    } catch (error) {
      window.alert("Dogs not found or incomplete name ");
      console.log(error.message);
    }
  };
};

export const filterByTemperamets = (payload) => {
  return {
    type: FILTER_BY_TEMPEREMENTS,
    payload,
  };
};

export const getDogTemperaments = () => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(`/temperament`);

      return dispatch({
        type: GET_DOGS_TEMPEREMENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
  // const weightOrder = payload === "asc" ? "WeightMin" : "WeightMax";
  // return {
  //   type: ORDER_BY_WEIGHT,
  //   payload: weightOrder,
  // };
};

export const postDogs = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/dogs`, payload);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
};
