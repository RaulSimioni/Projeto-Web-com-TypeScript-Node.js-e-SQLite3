import { type Request, type Response } from 'express';
import { AbstractController } from './AbstractController.js';
import { Author } from '../Model/Author.js';

export class AuthorCreateController extends AbstractController {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    public async execute(): Promise<void> {
        try {
            const method = this.getMethod();

            if (method === 'GET') {
                // Retornar formulário ou dados para criação
                this.sendJson({
                    message: 'Formulário de criação de autor',
                    fields: ['name']
                });
                return;
            }

            if (method === 'POST') {
                const { name } = this.getParams();

                if (!name) {
                    this.sendError('Nome do autor é obrigatório', 400);
                    return;
                }

                const author = new Author(name);
                const savedAuthor = await author.save();

                this.sendJson({
                    message: 'Autor criado com sucesso',
                    author: savedAuthor
                }, 201);
                return;
            }

            this.sendError('Método não permitido', 405);
        } catch (error) {
            this.sendError('Erro ao criar o autor');
        }
    }
}

