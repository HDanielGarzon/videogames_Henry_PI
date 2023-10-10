const { getGenresAll } = require("../controllers/genresController");

const getGenresHandler = async (req, res) => {
  try {
    const result = await getGenresAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { getGenresHandler };
// "Obtiene un arreglo con todos los géneros existentes de la API.
//  2.En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
//  3.Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí."
