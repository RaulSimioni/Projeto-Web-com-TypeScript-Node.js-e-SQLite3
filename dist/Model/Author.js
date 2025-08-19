import { AbstractModel } from "./AbstractModel.js";
export class Author extends AbstractModel {
    name;
    constructor(name) {
        super("authors");
        this.name = name;
    }
}
//# sourceMappingURL=Author.js.map