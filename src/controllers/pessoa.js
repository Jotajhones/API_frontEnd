import connection from "../config/config.js";

class Pessoas {
    async init(connection) {
        this.connection = connection;
        this.req = req;
        this.res = res;

        this.get();
        this.post();
        this.put();
        this.delete();
    };

    async get(req, res) {

        try {
            const sql = "SELECT * FROM pessoa";
            const [data] = await connection.query(sql);
            res.send(data);
            
        } catch (error) {
            console.log("> Não foi possivel importar a tabela pessoa.");
            res.send(error);
        }
    };

    async post(req, res) {
        let pessoa = req.body;
    
        try {
            const sql = "INSERT INTO pessoa (nome, cpf, telefone, email) VALUES (?,?,?,?)";              
            await connection.execute(sql, [pessoa.nome, pessoa.cpf, pessoa.telefone, pessoa.email]);
                
            console.log(`> Cadastro ${pessoa.nome} realizado com sucesso.`);
            res.send("> Cadastro realizado com sucesso.", 200);
        } catch (error) {
            console.log("Cadastro NÃO Realizado", 400);
            console.error(error);
        }
    };
    
    async put(req, res) {
        let pessoa = req.body;
    
        try {
          
            const sql = `UPDATE pessoa SET nome = ?, cpf = ?, telefone = ?, email =?, situacao = ? WHERE id_pessoa = ?`;
            await connection.execute(sql, [pessoa.nome, pessoa.cpf, pessoa.telefone, pessoa.email, pessoa.situacao, pessoa.id_pessoa]);
    
            console.log(`> Cadastro ${pessoa.nome}, atualizado com sucesso.`);
            res.send("Atualização realizada", 200);
    
        } catch (error) {
            console.log("Atualização NÃO Realizada", 400);
            console.error(error)
        }
    };
    
    async delete(req, res) {
        let pessoa = req.body;
    
        try {
            const sql = "DELETE FROM pessoa WHERE id_pessoa = ?"
            await connection.execute(sql, [pessoa.id_pessoa]);
    
            console.log("> Cadastro deletado com sucesso");
            res.send("> Cadastro deletado com sucesso", 200)
    
        } catch (error) {
            console.log("> A Exclusão não foi realizada.", 400);
            console.error(error)
        }
    };
}

export default new Pessoas;

