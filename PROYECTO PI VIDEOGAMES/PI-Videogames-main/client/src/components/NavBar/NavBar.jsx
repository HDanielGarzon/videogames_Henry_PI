import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar({ onSearch }) {
  return (
    <div className={style.container}>
      <button className={style.button}>
        <Link to="/home" className={style.routes}>
          pRINCIPAL
        </Link>
      </button>

      <button className={style.button}>
        <Link to="/create" className={style.routes}>
          cREAR
        </Link>
      </button>

      <SearchBar onSearch={onSearch} />
      <Link to="/">
        <img
          src="https://www.pngall.com/wp-content/uploads/12/Gaming-PNG-HD-Image.png"
          alt="Logo Control"
          className={style.img}
        />
      </Link>
    </div>
  );
}
