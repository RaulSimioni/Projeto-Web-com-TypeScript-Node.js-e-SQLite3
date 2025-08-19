import { type Request, type Response } from 'express';
import { AbstractController } from './AbstractController.js';
import { Category } from '../Model/Category.js';

export class CategoryController extends AbstractController {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    public async execute(): Promise<void> {
        try {
            const { id } = this.getParams();
            
            if (!id) {
                this.sendError('ID da categoria é obrigatório', 400);
                return;
            }

            const category = new Category('');
            const loadedCategory = await category.load(parseInt(id));

            if (!loadedCategory) {
                this.sendError('Categoria não encontrada', 404);
                return;
            }

            // Buscar posts da categoria
            const database = (await import('../Database/Database.js')).Database.getInstance();
            const posts = await database.all('SELECT * FROM posts WHERE categoryId = ? ORDER BY id DESC', [id]);

            this.sendJson({
                category: loadedCategory,
                posts: posts || []
            });
        } catch (error) {
            this.sendError('Erro ao carregar a categoria');
        }
    }
}

