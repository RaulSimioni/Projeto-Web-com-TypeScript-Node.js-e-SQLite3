import {} from 'express';
export class AbstractController {
    request;
    response;
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    /**
     * Recupera os parâmetros da requisição.
     *
     * @returns {any} Retorna os parâmetros da requisição.
     */
    getParams() {
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
    getMethod() {
        return this.request.method;
    }
    /**
     * Envia uma resposta JSON.
     *
     * @param data - Dados para enviar
     * @param status - Status HTTP (padrão: 200)
     */
    sendJson(data, status = 200) {
        this.response.status(status).json(data);
    }
    /**
     * Envia uma resposta de erro.
     *
     * @param message - Mensagem de erro
     * @param status - Status HTTP (padrão: 500)
     */
    sendError(message, status = 500) {
        this.response.status(status).json({ error: message });
    }
}
//# sourceMappingURL=AbstractController.js.map