import express from 'express';
import {} from 'express';
import { IndexController } from './Controller/IndexController.js';
import { PostController } from './Controller/PostController.js';
import { PostsController } from './Controller/PostsController.js';
import { CategoryController } from './Controller/CategoryController.js';
import { PostCreateController } from './Controller/PostCreateController.js';
import { CategoryCreateController } from './Controller/CategoryCreateController.js';
import { TagCreateController } from './Controller/TagCreateController.js';
import { AuthorCreateController } from './Controller/AuthorCreateController.js';
const PORT = parseInt(process.env.PORT || '3000', 10);
const app = express();
// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Rota principal - Home page
app.get('/', async (req, res) => {
    const indexController = new IndexController(req, res);
    await indexController.execute();
});
// Rotas para posts
app.get('/posts', async (req, res) => {
    const postsController = new PostsController(req, res);
    await postsController.execute();
});
app.get('/post/:id', async (req, res) => {
    const postController = new PostController(req, res);
    await postController.execute();
});
app.route('/post/create')
    .get(async (req, res) => {
    const postCreateController = new PostCreateController(req, res);
    await postCreateController.execute();
})
    .post(async (req, res) => {
    const postCreateController = new PostCreateController(req, res);
    await postCreateController.execute();
});
// Rotas para categorias
app.get('/category/:id', async (req, res) => {
    const categoryController = new CategoryController(req, res);
    await categoryController.execute();
});
app.route('/category/create')
    .get(async (req, res) => {
    const categoryCreateController = new CategoryCreateController(req, res);
    await categoryCreateController.execute();
})
    .post(async (req, res) => {
    const categoryCreateController = new CategoryCreateController(req, res);
    await categoryCreateController.execute();
});
// Rotas para tags
app.route('/tag/create')
    .get(async (req, res) => {
    const tagCreateController = new TagCreateController(req, res);
    await tagCreateController.execute();
})
    .post(async (req, res) => {
    const tagCreateController = new TagCreateController(req, res);
    await tagCreateController.execute();
});
// Rotas para autores
app.route('/author/create')
    .get(async (req, res) => {
    const authorCreateController = new AuthorCreateController(req, res);
    await authorCreateController.execute();
})
    .post(async (req, res) => {
    const authorCreateController = new AuthorCreateController(req, res);
    await authorCreateController.execute();
});
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor respondendo em: http://localhost:${PORT}`);
});
//# sourceMappingURL=main.js.map