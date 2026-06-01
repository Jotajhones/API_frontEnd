import db from "../config/database.js";

class PessoaController {
    async getAll(req, res) {
        try {
            const [rows] = await db.query("SELECT * FROM pessoa");
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        const { nome, cpf, telefone, email } = req.body;
        try {
            await db.execute(
                "INSERT INTO pessoa (nome, cpf, telefone, email) VALUES (?,?,?,?)",
                [nome, cpf, telefone, email]
            );
            res.status(201).json({ message: "Cadastro realizado com sucesso." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { nome, cpf, telefone, email, situacao, id_pessoa } = req.body;
        try {
            await db.execute(
                "UPDATE pessoa SET nome=?, cpf=?, telefone=?, email=?, situacao=? WHERE id_pessoa=?",
                [nome, cpf, telefone, email, situacao, id_pessoa]
            );
            res.status(200).json({ message: "Atualização realizada." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id_pessoa } = req.body;
        try {
            await db.execute("DELETE FROM pessoa WHERE id_pessoa = ?", [id_pessoa]);
            res.status(200).json({ message: "Cadastro deletado." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PessoaController();