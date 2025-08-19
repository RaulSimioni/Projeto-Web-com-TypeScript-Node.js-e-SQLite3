import sqlite3 from 'sqlite3';
export declare class Database {
    private static instance;
    private db;
    private dbPath;
    private constructor();
    /**
     * Singleton pattern para garantir uma única instância da conexão
     */
    static getInstance(): Database;
    /**
     * Obtém a instância do banco de dados SQLite
     */
    getDatabase(): sqlite3.Database;
    /**
     * Inicializa o banco de dados criando as tabelas necessárias
     */
    private initializeDatabase;
    /**
     * Cria as tabelas necessárias no banco de dados
     */
    private createTables;
    /**
     * Executa uma query SELECT e retorna todos os resultados
     */
    all(query: string, params?: any[]): Promise<any[]>;
    /**
     * Executa uma query SELECT e retorna apenas o primeiro resultado
     */
    get(query: string, params?: any[]): Promise<any>;
    /**
     * Executa uma query INSERT, UPDATE ou DELETE
     */
    run(query: string, params?: any[]): Promise<{
        lastID: number;
        changes: number;
    }>;
    /**
     * Fecha a conexão com o banco de dados
     */
    close(): void;
}
//# sourceMappingURL=Database.d.ts.map