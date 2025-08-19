import { Database } from '../Database/Database.js';

export abstract class AbstractModel {
    protected tableName: string;
    protected database: Database;
    protected id: number | null = null;

    constructor(tableName: string) {
        this.tableName = tableName;
        this.database = Database.getInstance();
    }

    public async load(id: number): Promise<this | null> {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const row = await this.database.get(sql, [id]);
        if (row) {
            Object.assign(this, row);
            return this;
        }
        return null;
    }

    public async save(): Promise<this> {
        const fields = Object.keys(this).filter(key => key !== 'tableName' && key !== 'database' && key !== 'id');
        const values = fields.map(key => (this as any)[key]);

        if (this.id) {
            // Update
            const setClause = fields.map(field => `${field} = ?`).join(', ');
            const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
            await this.database.run(sql, [...values, this.id]);
        } else {
            // Insert
            const placeholders = fields.map(() => '?').join(', ');
            const sql = `INSERT INTO ${this.tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
            const result = await this.database.run(sql, values);
            this.id = result.lastID;
        }
        return this;
    }

    public async delete(): Promise<boolean> {
        if (!this.id) {
            return false;
        }
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await this.database.run(sql, [this.id]);
        return result.changes > 0;
    }

    public getTableName(): string {
        return this.tableName;
    }

    public getId(): number | null {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
}


