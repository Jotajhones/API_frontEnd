import express from "express";
import { server } from "./src/server/server.js";
import router from "./src/routes/routes.js";
import { init } from "./src/controllers/controller.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use(router);
init();
server(app);

export default express
