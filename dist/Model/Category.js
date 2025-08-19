import { AbstractModel } from "./AbstractModel.js";
export class Category extends AbstractModel {
    name;
    constructor(name) {
        super("categories");
        this.name = name;
    }
}
//# sourceMappingURL=Category.js.map