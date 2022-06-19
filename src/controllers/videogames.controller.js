import Videogame from "../models/Videogame.js";
import Genre from "../models/Genre.js";
import Platform from "../models/Platform.js";
import { Op } from "sequelize";
import axios from "axios";

const KEY = process.env.API_KEY;
// peticion GET para obtener todos los videojuegos por nombre (?name=)
// Si no no hay nombre en la query devuelve todos los videojuegos
export const getVideogames = async (req, res) => {
  let { name } = req.query;
  let videogamesListApi = [];
  let videogames;
  let videogamesListApipages = [];
  let videogamesListDb;
  let qtygames = 100;
  let page = 1;

  try {
    if (name) {
      while (videogamesListApi.length < qtygames) {
        if (page === 1) {
          videogames = await axios.get(
            `https://api.rawg.io/api/games?key=${KEY}&search=${name}`
          );
          page = page + 1;
          videogamesListApi = videogames.data.results;
        }
        if (page > 1) {
          videogamesListApipages = await axios.get(
            `https://api.rawg.io/api/games?key=${KEY}&search=${name}&page=${page}`
          );
          page = page + 1;
          videogamesListApi = videogamesListApi.concat(
            videogamesListApipages.data.results
          );
        }
      }
      videogamesListDb = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [
          {
            model: Genre,
          },
          {
            model: Platform,
          },
        ],

        order: [["name", "ASC"]],
      });
    } else {
      while (videogamesListApi.length < qtygames) {
        if (page === 1) {
          videogames = await axios.get(
            `https://api.rawg.io/api/games?key=${KEY}`
          );
          page = page + 1;
          videogamesListApi = videogames.data.results;
        }
        if (page > 1) {
          videogamesListApipages = await axios.get(
            `https://api.rawg.io/api/games?key=${KEY}&page=${page}`
          );
          page = page + 1;
          videogamesListApi = videogamesListApi.concat(
            videogamesListApipages.data.results
          );
        }
      }
      videogamesListDb = await Videogame.findAll({
        include: [{ model: Genre }, { model: Platform }],
      });
    }
    Promise.all([videogamesListApi, videogamesListDb]).then((respuesta) => {
      const [videogameApi, videogameDb] = respuesta;
      let filteredDataVideogamesApi = videogameApi.map((videogame) => {
        return {
          id: videogame.id,
          name: videogame.name,
          released: videogame.released,
          background_image: videogame.background_image,
          rating: videogame.rating,
          platforms: videogame.platforms,
          genres: videogame.genres,
        };
      });
      let filteredDataVideogamesDb = videogameDb.map((videogame) => {
        return {
          id: videogame.id,
          name: videogame.name,
          released: videogame.released,
          background_image: videogame.background_image,
          rating: videogame.rating,
          platforms: videogame.platforms,
          genres: videogame.genres,
        };
      });

      let allVideogames = [
        ...filteredDataVideogamesApi,
        ...filteredDataVideogamesDb,
      ];
      res.json(allVideogames);
    });
  } catch (error) {
    console.log(error);
  }
};
