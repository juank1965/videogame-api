import { Router } from "express";
import home from "../controllers/home.controller.js";
import { getPlatforms } from "../controllers/platforms.controller.js";
import { getGenres } from "../controllers/genres.controller.js";
import {
  createVideogame,
  getVideogameById,
} from "../controllers/videogame.controller.js";
import { getVideogames } from "../controllers/videogames.controller.js";

const router = Router();

router.get("/", home);
router.get("/platforms", getPlatforms);
router.get("/genres", getGenres);
router.get("/videogame/:id", getVideogameById);
router.post("/videogames", createVideogame);
router.get("/videogames", getVideogames);

export default router;
