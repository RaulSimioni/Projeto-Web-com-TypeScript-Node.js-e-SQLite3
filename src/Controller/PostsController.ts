import { type Request, type Response } from 'express';
import { AbstractController } from './AbstractController.js';

export class PostsController extends AbstractController {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    public async execute(): Promise<void> {
        try {
            const database = (await import('../Database/Database.js')).Database.getInstance();
            const posts = await database.all('SELECT * FROM posts ORDER BY id DESC');
            
            this.sendJson({
                posts: posts || [],
                total: posts?.length || 0
            });
        } catch (error) {
            this.sendError('Erro ao carregar os posts');
        }
    }
}

