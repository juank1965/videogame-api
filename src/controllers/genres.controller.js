import Genre from "../models/Genre.js";
import axios from "axios";

const KEY = process.env.API_KEY;
// peticion GEt para obtener todos los generos
export const getGenres = async (req, res) => {
  try {
    const genresApis = await axios.get(
      `https://api.rawg.io/api/genres?key=${KEY}`
    );
    const genresApi = genresApis.data.results.map((genre) => {
      return {
        id: genre.id,
        name: genre.name,
      };
    });
    const genres = await Genre.findAll();

    if (genres.length > 0) {
      return res.status(200).json({
        results: genres,
      });
    } else {
      const genresCreated = await Genre.bulkCreate(genresApi);
      return res.status(200).json({
        results: genresCreated,
      });
    }
  } catch (error) {
    return res.json({
      message: `Error al obtener los generos ${error}`,
    });
  }
};
