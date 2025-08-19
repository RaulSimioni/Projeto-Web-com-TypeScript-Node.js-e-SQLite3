import { Database } from '../Database/Database.js';
export declare abstract class AbstractModel {
    protected tableName: string;
    protected database: Database;
    protected id: number | null;
    constructor(tableName: string);
    load(id: number): Promise<this | null>;
    save(): Promise<this>;
    delete(): Promise<boolean>;
    getTableName(): string;
    getId(): number | null;
    setId(id: number): void;
}
//# sourceMappingURL=AbstractModel.d.ts.map