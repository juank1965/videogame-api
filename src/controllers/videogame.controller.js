import Videogame from "../models/Videogame.js";
import Genre from "../models/Genre.js";
import Platform from "../models/Platform.js";
import axios from "axios";

const KEY = process.env.API_KEY;
// solicitud GET obtiene un video juego por id
export const getVideogameById = async (req, res) => {
  try {
    const id = req.params.id;
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    let videogameById;
    if (id) {
      if (regexExp.test(id)) {
        videogameById = await Videogame.findByPk(id, {
          include: [{ model: Genre }],
        });
      } else {
        let videogameApi = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${KEY}`
        );
        if (videogameApi) {
          videogameById = videogameApi.data;
        }
      }
    }
    let videogame = {
      id: videogameById.id,
      name: videogameById.name,
      description: videogameById.description,
      released: videogameById.released,
      background_image: videogameById.background_image,
      rating: videogameById.rating,
      platforms: videogameById.platforms,
      genres: videogameById.genres,
    };
    res.json(videogame);
  } catch (error) {
    res.json({
      message: `Error al buscar videojuego ${error}`,
    });
  }
};
// Solicitud POST crea un nuevo video juego recibe datos por body
export const createVideogame = async (req, res) => {
  try {
    const { name, description, image, released, rating, genres, platforms } =
      req.body;

    const newVideogame = await Videogame.create({
      name,
      description,
      released,
      background_image: image,
      rating,
    });
    genres.map(async (genre) => {
      let genre_id = await Genre.findAll({ where: { name: genre } });
      await newVideogame.addGenre(genre_id);
    });
    /*
    platforms.map(async (platform) => {
      let platform_id = await Platform.findOrCreate({
        where: { name: platform },
      });
      await newVideogame.addPlatform(platform_id);
    });*/
    res.json({
      message: `Se ha creado el video juego ${newVideogame.name}`,
    });
  } catch (error) {
    res.json({
      message: `Error al crear el video juego ${error}`,
    });
  }
};
