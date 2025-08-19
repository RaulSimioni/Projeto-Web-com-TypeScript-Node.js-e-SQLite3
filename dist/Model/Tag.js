import { AbstractModel } from "./AbstractModel.js";
export class Tag extends AbstractModel {
    name;
    constructor(name) {
        super("tags");
        this.name = name;
    }
}
//# sourceMappingURL=Tag.js.map