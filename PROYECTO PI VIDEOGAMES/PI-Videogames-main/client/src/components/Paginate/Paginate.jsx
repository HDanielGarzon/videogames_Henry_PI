import React from "react";
import { useDispatch } from "react-redux";
import { prevPage, nextPage } from "../../redux/action";
import style from "./Paginate.module.css";

export default function Paginate({ numberPage, totalPage }) {
  const dispatch = useDispatch();
  return (
    <div className={style.container}>
      <div className={style.paginate}>
        {numberPage <= 1 ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <>
            <button onClick={() => dispatch(prevPage())} className={style.buttonPage}>PREV</button>
            <p>{numberPage - 1}</p>
          </>
        )}
        <h3>{numberPage}</h3>
        {numberPage >= totalPage? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <>
            <p>{numberPage + 1}</p>
            <button onClick={() => dispatch(nextPage())} className={style.buttonPage}>NEXT</button>
          </>
        )}
      </div>
    </div>
  );
}