import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import router from "./src/routes/routes.js";
import { startServer } from "./src/server/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

startServer(app, port);