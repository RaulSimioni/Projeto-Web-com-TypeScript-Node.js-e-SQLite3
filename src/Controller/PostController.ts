import { type Request, type Response } from 'express';
import { AbstractController } from './AbstractController.js';
import { Post } from '../Model/Post.js';

export class PostController extends AbstractController {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    public async execute(): Promise<void> {
        try {
            const { id } = this.getParams();
            
            if (!id) {
                this.sendError('ID do post é obrigatório', 400);
                return;
            }

            const post = new Post('', '', 0, 0, 0);
            const loadedPost = await post.load(parseInt(id));

            if (!loadedPost) {
                this.sendError('Post não encontrado', 404);
                return;
            }

            this.sendJson(loadedPost);
        } catch (error) {
            this.sendError('Erro ao carregar o post');
        }
    }
}

