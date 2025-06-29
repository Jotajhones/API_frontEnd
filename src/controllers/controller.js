import connection from "../config/config.js";

export async function init(req, res) {
    try {
        const sql = "USE venda;"
        connection.query(sql);
        console.log("> conectado ao bando de dados.");
        res.send("API funcionando, conexao realizada com banco de dados.")
    } catch (error) {
        error
    }
}
