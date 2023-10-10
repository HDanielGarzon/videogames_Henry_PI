const { Router } = require("express");
const {
  createVideogameHandler,
  getVideogameHandler,
  getVideogamesHandlers,
  getNameVideogamesHandler,
} = require("../handlers/videogamesHandlers");
const { validate } = require("../middlerwares/validate");

const videogamesRoutes = Router();

videogamesRoutes.get("/name", getNameVideogamesHandler);

videogamesRoutes.get("/:id", getVideogameHandler);

videogamesRoutes.get("/", getVideogamesHandlers);

videogamesRoutes.post("/", validate, createVideogameHandler);

module.exports = videogamesRoutes;
