import { type Request, type Response } from 'express';
export declare abstract class AbstractController {
    protected request: Request;
    protected response: Response;
    constructor(request: Request, response: Response);
    /**
     * Executa a lógica do controlador.
     *
     * @returns {Promise<void>} Executa a lógica e responde à requisição.
     * @abstract
     */
    abstract execute(): Promise<void>;
    /**
     * Recupera os parâmetros da requisição.
     *
     * @returns {any} Retorna os parâmetros da requisição.
     */
    getParams(): any;
    /**
     * Recupera o método HTTP da requisição.
     *
     * @return {string} Retorna o método HTTP da requisição.
     */
    getMethod(): string;
    /**
     * Envia uma resposta JSON.
     *
     * @param data - Dados para enviar
     * @param status - Status HTTP (padrão: 200)
     */
    protected sendJson(data: any, status?: number): void;
    /**
     * Envia uma resposta de erro.
     *
     * @param message - Mensagem de erro
     * @param status - Status HTTP (padrão: 500)
     */
    protected sendError(message: string, status?: number): void;
}
//# sourceMappingURL=AbstractController.d.ts.map