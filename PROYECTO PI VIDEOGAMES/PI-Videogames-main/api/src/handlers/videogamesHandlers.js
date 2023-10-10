const {  createVideogame, getVideogameById, getAllVgames, searchVgameByName } = require("../controllers/videogameControllers");
const { Videogame, Genres } = require("../db");

const getVideogamesHandlers = async (req, res) => {
  try {
    const result = await getAllVgames();
    res.status(200).json(result)
    
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

const getNameVideogamesHandler=async (req, res) => {
//   const {name}=req.query;
//   try {
//     const result = await name ? searchVgameByName(name) : await 'Error, falta el nombre';
//     res.status(200).json(result)
    
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// };
const { name } = req.query;
try {
  if (!name) {
    throw new Error('Error, falta el nombre');
  }
  const result = await searchVgameByName(name);
  const limitedResults = result.slice(0, 15);
  console.log(name);
  res.status(200).json(limitedResults);
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

const getVideogameHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const videogame = await getVideogameById(id, source);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createVideogameHandler = async (req, res) => {
  const { name, description, platforms, genres, rating, background_image, released } = req.body;
  // const platformArray = Array.isArray(platforms) ? platforms : platforms.split(',');
  // const getGenresId= await genres.map(async(genre)=>await Genres.findOne({where:{name:genre}}))
  console.log(genres);
  // console.log(platformArray);
  const getGenresId = await Promise.all(
    genres.map(async (genre) => {
      const foundGenre = await Genres.findOne({ where: { name: genre } });
      return foundGenre.id;
    })
  );
  console.log('=)))))))',getGenresId);
  try {
    const newVideogame = await createVideogame(
      name,
      description,
      platforms,
      getGenresId,
      rating,
      background_image,
      released,
      );
      // newVideogame.created = true;
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(400).render('error', { error: "Falta llenar los campos" });
  }
};

module.exports = {
  getVideogamesHandlers,
  getNameVideogamesHandler,
  getVideogameHandler,
  createVideogameHandler,
};
