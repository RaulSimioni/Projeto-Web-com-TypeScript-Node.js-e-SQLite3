import { AbstractModel } from "./AbstractModel.js";

export class Category extends AbstractModel {
    public name: string;

    constructor(name: string) {
        super("categories");
        this.name = name;
    }
}


