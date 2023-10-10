import React, { useState } from "react";
import validationLanding from "./validationLanding";
import style from "./Landing.module.css";

export default function Landing({ login }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handlerChange = (event) => {
    const value = event.target.value;
    const property = event.target.name;
    setUserData({ ...userData, [property]: value });
    setErrors(validationLanding({ ...userData, [property]: value }));
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <div className={style.loginbox}>
      <div>
        <img
          src="https://uploads-ssl.webflow.com/646886eade54748b107a8397/647ce5710611799f8319cc92_gamepad.png"
          alt="Logo Control"
          className={style.img}
        />
      </div>
      <h2>Bienvenidos</h2>
      <form onSubmit={handlerSubmit} className={style.Form}>
        <div className={style.userbox}>
          <label className={style.label}></label>
          <input
            name="email"
            type="email"
            placeholder="Insert Email"
            value={userData.email}
            onChange={handlerChange}
            className={style.input}
          />
          {errors.email && <p className={style.alert}>{errors.email}</p>}
        </div>
        <div className={style.userbox}>
          <label className={style.label}></label>
          <input
            name="password"
            type="password"
            placeholder="Insert Password"
            value={userData.password}
            onChange={handlerChange}
            className={style.input}
          />
          {errors.password && <p className={style.alert}>{errors.password}</p>}
        </div>
        <button className={style.button}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
    </div>
  );
}
