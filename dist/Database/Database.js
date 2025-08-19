import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
export class Database {
    static instance;
    db;
    dbPath;
    constructor() {
        this.dbPath = path.resolve(process.cwd(), 'database.sqlite');
        this.db = new sqlite3.Database(this.dbPath);
        this.initializeDatabase();
    }
    /**
     * Singleton pattern para garantir uma única instância da conexão
     */
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    /**
     * Obtém a instância do banco de dados SQLite
     */
    getDatabase() {
        return this.db;
    }
    /**
     * Inicializa o banco de dados criando as tabelas necessárias
     */
    initializeDatabase() {
        // Verifica se o arquivo do banco existe, se não, será criado automaticamente pelo sqlite3
        if (!fs.existsSync(this.dbPath)) {
            console.log(`Criando novo banco de dados em: ${this.dbPath}`);
        }
        else {
            console.log(`Conectado ao banco de dados existente: ${this.dbPath}`);
        }
        // Cria a tabela posts se não existir
        this.createTables();
    }
    /**
     * Cria as tabelas necessárias no banco de dados
     */
    createTables() {
        const createTablesSQL = `
            CREATE TABLE IF NOT EXISTS authors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS tags (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                authorId INTEGER NOT NULL,
                categoryId INTEGER NOT NULL,
                tagId INTEGER NOT NULL,
                FOREIGN KEY (authorId) REFERENCES authors(id),
                FOREIGN KEY (categoryId) REFERENCES categories(id),
                FOREIGN KEY (tagId) REFERENCES tags(id)
            );
        `;
        this.db.exec(createTablesSQL, (err) => {
            if (err) {
                console.error('Erro ao criar as tabelas:', err.message);
            }
            else {
                console.log('Tabelas criadas/verificadas com sucesso');
            }
        });
    }
    /**
     * Executa uma query SELECT e retorna todos os resultados
     */
    all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    /**
     * Executa uma query SELECT e retorna apenas o primeiro resultado
     */
    get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    /**
     * Executa uma query INSERT, UPDATE ou DELETE
     */
    run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        });
    }
    /**
     * Fecha a conexão com o banco de dados
     */
    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Erro ao fechar o banco de dados:', err.message);
            }
            else {
                console.log('Conexão com o banco de dados fechada.');
            }
        });
    }
}
//# sourceMappingURL=Database.js.map