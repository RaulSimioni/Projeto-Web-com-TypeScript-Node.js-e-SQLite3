import { type Request, type Response } from 'express';
import { AbstractController } from './AbstractController.js';
import { Category } from '../Model/Category.js';

export class CategoryCreateController extends AbstractController {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    public async execute(): Promise<void> {
        try {
            const method = this.getMethod();

            if (method === 'GET') {
                // Retornar formulário ou dados para criação
                this.sendJson({
                    message: 'Formulário de criação de categoria',
                    fields: ['name']
                });
                return;
            }

            if (method === 'POST') {
                const { name } = this.getParams();

                if (!name) {
                    this.sendError('Nome da categoria é obrigatório', 400);
                    return;
                }

                const category = new Category(name);
                const savedCategory = await category.save();

                this.sendJson({
                    message: 'Categoria criada com sucesso',
                    category: savedCategory
                }, 201);
                return;
            }

            this.sendError('Método não permitido', 405);
        } catch (error) {
            this.sendError('Erro ao criar a categoria');
        }
    }
}

