import {} from 'express';
import { AbstractController } from './AbstractController.js';
import { Post } from '../Model/Post.js';
export class PostCreateController extends AbstractController {
    constructor(request, response) {
        super(request, response);
    }
    async execute() {
        try {
            const method = this.getMethod();
            if (method === 'GET') {
                // Retornar formulário ou dados para criação
                this.sendJson({
                    message: 'Formulário de criação de post',
                    fields: ['title', 'content', 'authorId', 'categoryId', 'tagId']
                });
                return;
            }
            if (method === 'POST') {
                const { title, content, authorId, categoryId, tagId } = this.getParams();
                if (!title || !content || !authorId || !categoryId || !tagId) {
                    this.sendError('Todos os campos são obrigatórios', 400);
                    return;
                }
                const post = new Post(title, content, parseInt(authorId), parseInt(categoryId), parseInt(tagId));
                const savedPost = await post.save();
                this.sendJson({
                    message: 'Post criado com sucesso',
                    post: savedPost
                }, 201);
                return;
            }
            this.sendError('Método não permitido', 405);
        }
        catch (error) {
            this.sendError('Erro ao criar o post');
        }
    }
}
//# sourceMappingURL=PostCreateController.js.map