import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";

// Ejecutar express
const app = express();

app.set("port", process.env.PORT || 3001);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api", routes);

export default app;
