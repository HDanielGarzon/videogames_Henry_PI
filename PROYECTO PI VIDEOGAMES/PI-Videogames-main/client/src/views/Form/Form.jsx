import React, { useState } from "react";
import style from "./Form.module.css";
import { useDispatch } from "react-redux";
import { createVideogames } from "../../redux/action";
import { allPlatforms, allGenres } from "./platformsAndGenres";
import validationForm from "./validationForm";

export default function Form() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: [],
    rating: "",
    background_image: "",
    released: "",
    genres: [],
  });

  const [errors, setErrors] = useState({});
  
  const handlerChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      let updatedArray;
      if (checked) {
        updatedArray = [...form[name], value];
      } else {
        updatedArray = form[name].filter((item) => item !== value);
      }

      setForm({ ...form, [name]: updatedArray });
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors(validationForm({ ...form, [name]: value }));
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if(!form){
      return alert('Falta llenar los campos')
    }else{
    const formattedForm = {
      ...form,
      platforms: form.platforms.join(", "),
    };
    dispatch(createVideogames(formattedForm));
    setForm({
      name: "",
      description: "",
      platforms: [],
      rating: "",
      background_image: "",
      released: "",
      genres: [],
    });}
  };
  //falta verificar si ya quedo creado, revisar en back que este bien y falta hacer el validador. estaba pensando en redux al estilo de favoritos crear un espacio para guardar los creados.

  return (
    <div >
      <h1>ahora estamos en Form</h1>
      <form onSubmit={handlerSubmit} className={style.container}>
        <div className={style.teamOne}>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              value={form.name}
              onChange={handlerChange}
              name="name"
            />
            {errors.name && <p className={style.alert}>{errors.name}</p>}
          </div>

          <div>
            <label>Rating: </label>
            <input
              type="text"
              value={form.rating}
              onChange={handlerChange}
              name="rating"
            />
            {errors.rating && <p className={style.alert}>{errors.rating}</p>}
          </div>

          <div>
            <label>Imagen: </label>
            <input
              type="text"
              value={form.background_image}
              onChange={handlerChange}
              name="background_image"
            />
            {errors.background_image && <p className={style.alert}>{errors.background_image}</p>}
          </div>

          <div>
            <label>Fecha de lanzamiento: </label>
            <input
              type="text"
              value={form.released}
              onChange={handlerChange}
              name="released"
            />
            {errors.released && <p className={style.alert}>{errors.released}</p>}
          </div>
          <div>
            <label>Decripción: </label>
            <input
              type="text"
              value={form.description}
              onChange={handlerChange}
              name="description"
            />
            {errors.description && <p className={style.alert}>{errors.description}</p>}
          </div>
        </div>

        <div className={style.teamTwo}>
          <div>
            <label>Plataformas:</label>
            <div>
              {allPlatforms?.map((platform) => {
                return (
                  <label key={platform}>
                    {platform}
                    <input
                      type="checkbox"
                      name="platforms"
                      value={platform}
                      checked={form.platforms.includes(platform)}
                      onChange={handlerChange}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <label>Géneros:</label>
            <div>
              {allGenres?.map((genre) => {
                return (
                  <label key={genre}>
                    {genre}
                    <input
                      type="checkbox"
                      name="genres"
                      value={genre}
                      checked={form.genres.includes(genre)}
                      onChange={handlerChange}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <button type="submit" className={style.button}>
        <img
          src="https://www.pngall.com/wp-content/uploads/12/Gaming-PNG-HD-Image.png"
          alt="Logo Control"
          className={style.img}
        />
        </button>
      </form>
    </div>
  );
}
