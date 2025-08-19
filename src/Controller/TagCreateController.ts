import { type Request, type Response } from 'express';
import { AbstractController } from './AbstractController.js';
import { Tag } from '../Model/Tag.js';

export class TagCreateController extends AbstractController {
    constructor(request: Request, response: Response) {
        super(request, response);
    }

    public async execute(): Promise<void> {
        try {
            const method = this.getMethod();

            if (method === 'GET') {
                // Retornar formulário ou dados para criação
                this.sendJson({
                    message: 'Formulário de criação de tag',
                    fields: ['name']
                });
                return;
            }

            if (method === 'POST') {
                const { name } = this.getParams();

                if (!name) {
                    this.sendError('Nome da tag é obrigatório', 400);
                    return;
                }

                const tag = new Tag(name);
                const savedTag = await tag.save();

                this.sendJson({
                    message: 'Tag criada com sucesso',
                    tag: savedTag
                }, 201);
                return;
            }

            this.sendError('Método não permitido', 405);
        } catch (error) {
            this.sendError('Erro ao criar a tag');
        }
    }
}

