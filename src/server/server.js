import { initDatabase } from "../config/database.js";

export async function startServer(app, port) {
    try {
        await initDatabase();
        console.log("> Banco de dados inicializado.");
        
        app.listen(port, () => {
            console.log(`> Server rodando em: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("> Erro ao iniciar servidor:", error);
    }
}