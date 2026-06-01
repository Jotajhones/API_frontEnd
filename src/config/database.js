import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    multipleStatements: true
});

export async function initDatabase() {
    const connection = await pool.getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS venda;`);
    await connection.query(`USE venda;`);
    
    await connection.query(`
        CREATE TABLE IF NOT EXISTS pessoa (
            id_pessoa INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100),
            cpf VARCHAR(14),
            telefone VARCHAR(20),
            email VARCHAR(100),
            situacao VARCHAR(20) DEFAULT 'ativo'
        );
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS produto (
            id_produto INT AUTO_INCREMENT PRIMARY KEY,
            produto VARCHAR(100),
            quantidade INT,
            preco DECIMAL(10,2),
            situacao VARCHAR(20) DEFAULT 'ativo'
        );
    `);
    connection.release();
}

export default pool;