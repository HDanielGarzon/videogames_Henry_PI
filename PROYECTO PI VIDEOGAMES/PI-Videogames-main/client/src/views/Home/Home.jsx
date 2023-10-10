import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVideogame } from "../../redux/action";

export default function Home({videogame}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogame());
  }, [dispatch]);

  return (
    <div>
      <h1>
        <div></div>
        <CardsContainer videogame={videogame}/>
      </h1>
    </div>
  );
}
