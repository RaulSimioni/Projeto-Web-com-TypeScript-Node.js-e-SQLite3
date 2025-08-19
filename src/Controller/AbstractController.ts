import { type Request, type Response } from 'express';

export abstract class AbstractController {
    protected request: Request;
    protected response: Response;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    /**
     * Executa a lógica do controlador.
     *
     * @returns {Promise<void>} Executa a lógica e responde à requisição.
     * @abstract
     */
    public abstract execute(): Promise<void>;

    /**
     * Recupera os parâmetros da requisição.
     *
     * @returns {any} Retorna os parâmetros da requisição.
     */
    public getParams(): any {
        return {
            ...this.request.params,
            ...this.request.query,
            ...this.request.body
        };
    }

    /**
     * Recupera o método HTTP da requisição.
     *
     * @return {string} Retorna o método HTTP da requisição.
     */
    public getMethod(): string {
        return this.request.method;
    }

    /**
     * Envia uma resposta JSON.
     *
     * @param data - Dados para enviar
     * @param status - Status HTTP (padrão: 200)
     */
    protected sendJson(data: any, status: number = 200): void {
        this.response.status(status).json(data);
    }

    /**
     * Envia uma resposta de erro.
     *
     * @param message - Mensagem de erro
     * @param status - Status HTTP (padrão: 500)
     */
    protected sendError(message: string, status: number = 500): void {
        this.response.status(status).json({ error: message });
    }
}

