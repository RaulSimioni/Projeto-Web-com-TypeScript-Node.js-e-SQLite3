import { AbstractModel } from "./AbstractModel.js";

export class Post extends AbstractModel {
    public title: string;
    public content: string;
    public authorId: number;
    public categoryId: number;
    public tagId: number;

    constructor(title: string, content: string, authorId: number, categoryId: number, tagId: number) {
        super("posts");
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.categoryId = categoryId;
        this.tagId = tagId;
    }
}


