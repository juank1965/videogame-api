import Platform from "../models/Platform.js";
import axios from "axios";

const KEY = process.env.API_KEY;
// peticion GEt para obtener todas las plataformas
export const getPlatforms = async (req, res) => {
  try {
    const platformsApis = await axios.get(
      `https://api.rawg.io/api/platforms?key=${KEY}`
    );
    const platformsApi = platformsApis.data.results.map((platform) => {
      return {
        id: platform.id,
        name: platform.name,
      };
    });
    const platforms = await Platform.findAll();

    if (platforms.length > 0) {
      return res.status(200).json({
        ok: true,
        message: "Platforms found",
        platforms: platforms,
      });
    } else {
      const platformsCreated = await Platform.bulkCreate(platformsApi);
      return res.status(200).json({
        ok: true,
        message: "Platforms created",
        platforms: platformsCreated,
      });
    }
  } catch (error) {
    return res.json({
      message: `Error al obtener las plataformas ${error}`,
    });
  }
};
