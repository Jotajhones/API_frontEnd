import { Router } from "express";
import { init } from "../controllers/controller.js";
import Pessoas from "../controllers/pessoa.js"
import Produtos from "../controllers/produtos.js";

const router = Router();

router.get("/", init);

router.get("/pessoas", Pessoas.get);
router.post("/pessoas", Pessoas.post);
router.put("/pessoas", Pessoas.put);
router.delete("/pessoas", Pessoas.delete);

router.get("/produtos", Produtos.get);
router.post("/produtos", Produtos.post);
router.put("/produtos", Produtos.put);
router.delete("/produtos", Produtos.delete);

export default router;
