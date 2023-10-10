import axios from "axios";
import {
  GET_VIDEOGAMES,
  VIDEOGAME_NAME,
  CREATE_VIDEOGAME,
  FILTER_VIDEOGAME,
  ORDER_VIDEOGAME,
  NEXT_PAGE,
  PREV_PAGE,
} from "./actionTypes";

export const getVideogame = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    const videogames = response.data;
    dispatch({ type: GET_VIDEOGAMES, payload: videogames });
  };
};

export const getVideogameByName = (name) => {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/videogames/name?name=${name}`
    );
    const videogameName = response.data;
    dispatch({ type: VIDEOGAME_NAME, payload: videogameName });
  };
};

export const createVideogames = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/videogames", form);
      const addVideogame = response.data;
      dispatch({ type: CREATE_VIDEOGAME, payload: addVideogame });
    } catch (error) {
      console.log(error);}
  };
};

export const filter = (genres) => {
  return { type: FILTER_VIDEOGAME, payload: genres };
};

export const order = (card) => {
  return { type: ORDER_VIDEOGAME, payload: card };
};

export const nextPage = () => {
  return { type: NEXT_PAGE };
};

export const prevPage = () => {
  return { type: PREV_PAGE };
};
