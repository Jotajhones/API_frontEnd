import { Router } from "express";
import PessoaController from "../controllers/PessoaController.js";
import ProdutoController from "../controllers/ProdutoController.js";

const router = Router();

router.get("/pessoas", PessoaController.getAll);
router.post("/pessoas", PessoaController.create);
router.put("/pessoas", PessoaController.update);
router.delete("/pessoas", PessoaController.delete);

router.get("/produtos", ProdutoController.getAll);
router.post("/produtos", ProdutoController.create);
router.put("/produtos", ProdutoController.update);
router.delete("/produtos", ProdutoController.delete);

export default router;