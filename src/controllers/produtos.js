import connection from "../config/config.js";

class Produtos {

    async init(connection, req, res) {

        this.connection = connection;
        this.req = req;
        this.res = res;

        this.get();
        this.post();
        this.put();
        this.delete();
    }

    async get(req, res) {

        try {
            const sql = "SELECT * FROM produto"
            const [data] = await connection.query(sql);
            res.send(data);

        } catch (error) {
            console.log("> Não foi possivel importar a tabela pordutos.");
            res.send(error);
        }
    }

    async post(req, res) {

        let produto = req.body;

        try {

            const sql = "INSERT INTO produto (produto, quantidade, preco) VALUE (?, ?, ?)";
            await connection.execute(sql, [produto.produto, produto.quantidade, produto.preco]);

            console.log("> Produto cadastrado com sucesso!", 200);
            res.send(200);
        } catch (error) {
            console.error("> Produto NÃO inserido!", 400);
            res.send(error);
        }
    };

    async put(req, res) {
        let produto = req.body;

        try {
            const sql = "UPDATE produto SET produto=?, quantidade=?, preco=?, situacao=? WHERE id_produto=?";

            await connection.execute(sql, [produto.produto, produto.quantidade, produto.preco, produto.situacao, produto.id_produto]);

            console.log("> Produto atualizado com sucesso!", 200);
            res.send(200)
        } catch (error) {

            console.error("> produto não atualizado.");
            console.error(error);
            res.send(error); 
        }
    };

    async delete(req, res) {
        let produto = req.body;

        try {
            const sql = "DELETE FROM produto WHERE id_produto = ?"
            await connection.execute(sql, [produto.id_produto]);

            console.log("> Produto deletado com sucesso");
            res.send(200)

        } catch (error) {
            console.log("> A Exclusão não foi realizada.", 400);
            console.error(error);
            res.send(error);
        }
    };
}

export default new Produtos;