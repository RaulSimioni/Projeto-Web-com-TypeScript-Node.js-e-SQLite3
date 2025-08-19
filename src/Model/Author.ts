import { AbstractModel } from "./AbstractModel.js";

export class Author extends AbstractModel {
    public name: string;

    constructor(name: string) {
        super("authors");
        this.name = name;
    }
}


