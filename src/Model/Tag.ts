import { AbstractModel } from "./AbstractModel.js";

export class Tag extends AbstractModel {
    public name: string;

    constructor(name: string) {
        super("tags");
        this.name = name;
    }
}


