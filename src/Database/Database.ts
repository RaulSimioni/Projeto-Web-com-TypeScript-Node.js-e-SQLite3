import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

export class Database {
    private static instance: Database;
    private db: sqlite3.Database;
    private dbPath: string;

    private constructor() {
        this.dbPath = path.resolve(process.cwd(), 'database.sqlite');
        this.db = new sqlite3.Database(this.dbPath);
        this.initializeDatabase();
    }

    /**
     * Singleton pattern para garantir uma única instância da conexão
     */
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    /**
     * Obtém a instância do banco de dados SQLite
     */
    public getDatabase(): sqlite3.Database {
        return this.db;
    }

    /**
     * Inicializa o banco de dados criando as tabelas necessárias
     */
    private initializeDatabase(): void {
        // Verifica se o arquivo do banco existe, se não, será criado automaticamente pelo sqlite3
        if (!fs.existsSync(this.dbPath)) {
            console.log(`Criando novo banco de dados em: ${this.dbPath}`);
        } else {
            console.log(`Conectado ao banco de dados existente: ${this.dbPath}`);
        }

        // Cria a tabela posts se não existir
        this.createTables();
    }

    /**
     * Cria as tabelas necessárias no banco de dados
     */
    private createTables(): void {
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

        this.db.exec(createTablesSQL, (err: any) => {
            if (err) {
                console.error('Erro ao criar as tabelas:', err.message);
            } else {
                console.log('Tabelas criadas/verificadas com sucesso');
            }
        });
    }

    /**
     * Executa uma query SELECT e retorna todos os resultados
     */
    public all(query: string, params: any[] = []): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err: any, rows: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Executa uma query SELECT e retorna apenas o primeiro resultado
     */
    public get(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err: any, row: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * Executa uma query INSERT, UPDATE ou DELETE
     */
    public run(query: string, params: any[] = []): Promise<{ lastID: number, changes: number }> {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function (this: { lastID: number, changes: number }, err: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        });
    }

    /**
     * Fecha a conexão com o banco de dados
     */
    public close(): void {
        this.db.close((err: any) => {
            if (err) {
                console.error('Erro ao fechar o banco de dados:', err.message);
            } else {
                console.log('Conexão com o banco de dados fechada.');
            }
        });
    }
}

