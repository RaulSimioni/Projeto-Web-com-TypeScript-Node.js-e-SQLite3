import { AbstractModel } from "./AbstractModel.js";
export class Post extends AbstractModel {
    title;
    content;
    authorId;
    categoryId;
    tagId;
    constructor(title, content, authorId, categoryId, tagId) {
        super("posts");
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.categoryId = categoryId;
        this.tagId = tagId;
    }
}
//# sourceMappingURL=Post.js.map