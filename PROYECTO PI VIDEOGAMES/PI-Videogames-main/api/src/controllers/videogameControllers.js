const { Videogame, Genres } = require("../db");
const axios = require("axios");

const cleanArray = (arr) =>
  arr.map(
    ({ id, name, released, platforms, background_image, rating, genres }) => {
      const platformNames = platforms.map(({ platform }) => platform.name);
      const genresName = genres.map(({ name }) => name);
      return {
        id: id,
        name: name,
        released: released,
        platforms: platformNames,
        background_image: background_image,
        rating: rating,
        genres: genresName,
        created: false,
      };
    }
  );

const getVideogameById = async (id, source) => {
  const videogame =
    source === "api"
      ? (
          await axios.get(
            `https://api.rawg.io/api/games/${id}?key=bfb7270e0cce4ba0bf5f6667541c1c09`
          )
        ).data
      : await Videogame.findByPk(id, {
          include: {
            model: Genres,
            attributes: ["name"],
          },
        });
  return videogame;
};

const createVideogame = async (
  name,
  description,
  platforms,
  getGenresId,
  rating,
  background_image,
  released
) => {
  const platformArray = Array.isArray(platforms) ? platforms : platforms.split(',');
    const newVideogameData = {
    name,
    description,
    platforms: platformArray,
    rating,
    background_image,
    released,
    created: true,
  };
  const newVideogame = await Videogame.create(newVideogameData);
  await newVideogame.setGenres(getGenresId);
  console.log("newVideogames====", newVideogame);
  return newVideogame;
};

const searchVgameByName = async (name) => {
  const dbVideogames = await Videogame.findAll({ where: { name: name } });
  const apiNameVideogames = (
    await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=bfb7270e0cce4ba0bf5f6667541c1c09`
    )
  ).data.results;
  // console.log('´´´´', apiNameVideogames);
  const apiVideogamesNames = cleanArray(apiNameVideogames);
  console.log("............", apiVideogamesNames);
  return [...dbVideogames, ...apiVideogamesNames];
  // const apiVideogamesRaw =
  //   (
  //     await axios.get(
  //       "https://api.rawg.io/api/games?key=bfb7270e0cce4ba0bf5f6667541c1c09"
  //     )
  //   ).data.results
  // ;
  // const apiVideogames = cleanArray(apiVideogamesRaw);
  // const filteredVideogames= apiVideogames.filter(game=>game.name===name)
  // return [...dbVideogames, ...filteredVideogames];
};

const getAllVgames = async () => {
  const dbVideogames = await Videogame.findAll({
    include: [{ model: Genres, attribute: ["name"] }],
  });
  // const game=dbVideogames?.map(({dataValues})=>{
  //   const genresName=dataValues.Genres?.map(({name})=>name)})
  // const genresName = dbVideogames.forEach(({genres}) => genres= genres.map(({name})=> name));
  const game = dbVideogames?.map(( elem ) => {
    const genresName = elem.genres?.map(({ name }) => name);

    return {
      id: elem.id,
      name: elem.name,
      description: elem.description,
      platforms: elem.platforms,
      rating: elem.rating,
      background_image: elem.background_image,
      released: elem.released,
      genres: genresName,
    };
  });

  // elem.genres = genresName;

  const apiVideogamesRaw1 = (
    await axios.get(
      "https://api.rawg.io/api/games?key=bfb7270e0cce4ba0bf5f6667541c1c09&page=1&page_size=100"
    )
  ).data.results;
  const apiVideogamesRaw2 = (
    await axios.get(
      "https://api.rawg.io/api/games?key=bfb7270e0cce4ba0bf5f6667541c1c09&page=2&page_size=100"
    )
  ).data.results;
  const apiVideogamesRaw3 = (
    await axios.get(
      "https://api.rawg.io/api/games?key=bfb7270e0cce4ba0bf5f6667541c1c09&page=3&page_size=100"
    )
  ).data.results;
  const apiTotal = [
    ...apiVideogamesRaw1,
    ...apiVideogamesRaw2,
    ...apiVideogamesRaw3,
  ];
  const apiVideogames = cleanArray(apiTotal);
  return [...game, ...apiVideogames];
};
// const getAllVgames = async () => {
//   try {
//     // Realizar las tres solicitudes en paralelo utilizando Promise.all()
//     const apiRequests = [
//       axios.get("https://api.rawg.io/api/games?key=bfb7270e0cce4ba0bf5f6667541c1c09&page=1&page_size=100"),
//       axios.get("https://api.rawg.io/api/games?key=bfb7270e0cce4ba0bf5f6667541c1c09&page=2&page_size=100"),
//       axios.get("https://api.rawg.io/api/games?key=bfb7270e0cce4ba0bf5f6667541c1c09&page=3&page_size=100")
//     ];

//     // Esperar a que todas las solicitudes se completen con Promise.all()
//     const [apiVideogamesRaw1, apiVideogamesRaw2, apiVideogamesRaw3] = await Promise.all(apiRequests);

//     const apiTotal = [...apiVideogamesRaw1.data.results, ...apiVideogamesRaw2.data.results, ...apiVideogamesRaw3.data.results];
//     const apiVideogames = cleanArray(apiTotal);

//     // Realizar la consulta a la base de datos
//     const dbVideogames = await Videogame.findAll();

//     return [...dbVideogames, ...apiVideogames];
//   } catch (error) {
//     // Manejar cualquier error de las solicitudes
//     console.error("Error al obtener los videojuegos:", error);
//     return [];
//   }
// };
module.exports = {
  createVideogame,
  getVideogameById,
  getAllVgames,
  searchVgameByName,
};
