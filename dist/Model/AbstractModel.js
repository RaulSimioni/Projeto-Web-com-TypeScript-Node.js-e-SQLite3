import { Database } from '../Database/Database.js';
export class AbstractModel {
    tableName;
    database;
    id = null;
    constructor(tableName) {
        this.tableName = tableName;
        this.database = Database.getInstance();
    }
    async load(id) {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const row = await this.database.get(sql, [id]);
        if (row) {
            Object.assign(this, row);
            return this;
        }
        return null;
    }
    async save() {
        const fields = Object.keys(this).filter(key => key !== 'tableName' && key !== 'database' && key !== 'id');
        const values = fields.map(key => this[key]);
        if (this.id) {
            // Update
            const setClause = fields.map(field => `${field} = ?`).join(', ');
            const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
            await this.database.run(sql, [...values, this.id]);
        }
        else {
            // Insert
            const placeholders = fields.map(() => '?').join(', ');
            const sql = `INSERT INTO ${this.tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
            const result = await this.database.run(sql, values);
            this.id = result.lastID;
        }
        return this;
    }
    async delete() {
        if (!this.id) {
            return false;
        }
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await this.database.run(sql, [this.id]);
        return result.changes > 0;
    }
    getTableName() {
        return this.tableName;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}
//# sourceMappingURL=AbstractModel.js.map