import db from "../config/database.js";

class ProdutoController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query("SELECT * FROM produto");
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        const { produto, quantidade, preco } = req.body;
        try {
            await db.execute(
                "INSERT INTO produto (produto, quantidade, preco) VALUES (?, ?, ?)",
                [produto, quantidade, preco]
            );
            res.status(201).json({ message: "Produto cadastrado com sucesso." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { produto, quantidade, preco, situacao, id_produto } = req.body;
        try {
            await db.execute(
                "UPDATE produto SET produto=?, quantidade=?, preco=?, situacao=? WHERE id_produto=?",
                [produto, quantidade, preco, situacao, id_produto]
            );
            res.status(200).json({ message: "Produto atualizado com sucesso." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id_produto } = req.body;
        try {
            await db.execute("DELETE FROM produto WHERE id_produto = ?", [id_produto]);
            res.status(200).json({ message: "Produto deletado." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new ProdutoController();