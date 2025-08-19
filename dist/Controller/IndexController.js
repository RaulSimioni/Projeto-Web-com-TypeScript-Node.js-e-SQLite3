import {} from 'express';
import { AbstractController } from './AbstractController.js';
import { Post } from '../Model/Post.js';
export class IndexController extends AbstractController {
    constructor(request, response) {
        super(request, response);
    }
    async execute() {
        try {
            // Buscar todos os posts para a página inicial
            const database = (await import('../Database/Database.js')).Database.getInstance();
            const posts = await database.all('SELECT * FROM posts ORDER BY id DESC LIMIT 10');
            this.sendJson({
                message: 'Bem-vindo ao Blog!',
                posts: posts || []
            });
        }
        catch (error) {
            this.sendError('Erro ao carregar a página inicial');
        }
    }
}
//# sourceMappingURL=IndexController.js.map