# Implementação do Sistema MVC - Blog

## Resumo da Implementação

Este projeto implementa um sistema de blog completo utilizando TypeScript, Node.js, Express e SQLite3, seguindo o padrão arquitetural MVC (Model-View-Controller).

## Estrutura Implementada

### 1. Modelos (Models)

#### AbstractModel
- **Localização**: `src/Model/AbstractModel.ts`
- **Funcionalidades**:
  - Classe base para todos os modelos
  - Métodos implementados: `load()`, `save()`, `delete()`
  - Gerenciamento automático de ID
  - Conexão com banco de dados SQLite3

#### Modelos Específicos
- **Post** (`src/Model/Post.ts`): Representa artigos do blog
- **Category** (`src/Model/Category.ts`): Representa categorias dos posts
- **Author** (`src/Model/Author.ts`): Representa autores dos posts
- **Tag** (`src/Model/Tag.ts`): Representa tags dos posts

### 2. Controladores (Controllers)

#### AbstractController
- **Localização**: `src/Controller/AbstractController.ts`
- **Funcionalidades**:
  - Classe base para todos os controladores
  - Métodos implementados: `execute()`, `getParams()`, `getMethod()`
  - Métodos auxiliares: `sendJson()`, `sendError()`

#### Controladores Específicos
- **IndexController**: Página inicial do blog
- **PostController**: Visualização de post individual
- **PostsController**: Listagem de posts
- **CategoryController**: Posts por categoria
- **PostCreateController**: Criação de posts
- **CategoryCreateController**: Criação de categorias
- **TagCreateController**: Criação de tags
- **AuthorCreateController**: Criação de autores

### 3. Banco de Dados

#### Database
- **Localização**: `src/Database/Database.ts`
- **Funcionalidades**:
  - Padrão Singleton para conexão única
  - Métodos: `all()`, `get()`, `run()`
  - Criação automática de tabelas
  - Suporte a operações assíncronas

#### Estrutura das Tabelas
```sql
-- Autores
CREATE TABLE authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Categorias
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Tags
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Posts
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    authorId INTEGER NOT NULL,
    categoryId INTEGER NOT NULL,
    tagId INTEGER NOT NULL,
    FOREIGN KEY (authorId) REFERENCES authors(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id),
    FOREIGN KEY (tagId) REFERENCES tags(id)
);
```

### 4. Sistema de Rotas

#### Rotas Implementadas
- `GET /` - Página inicial
- `GET /posts` - Listagem de posts
- `GET /post/:id` - Visualização de post específico
- `GET|POST /post/create` - Criação de posts
- `GET /category/:id` - Posts por categoria
- `GET|POST /category/create` - Criação de categorias
- `GET|POST /tag/create` - Criação de tags
- `GET|POST /author/create` - Criação de autores

## Operações CRUD Implementadas

### Create (Criar)
- ✅ Criação de posts
- ✅ Criação de categorias
- ✅ Criação de tags
- ✅ Criação de autores

### Read (Ler)
- ✅ Listagem de posts
- ✅ Visualização de post individual
- ✅ Posts por categoria
- ✅ Página inicial com posts recentes

### Update (Atualizar)
- ✅ Implementado no AbstractModel (método `save()`)

### Delete (Excluir)
- ✅ Implementado no AbstractModel (método `delete()`)

## Testes Realizados

### Testes de Criação
1. **Categoria**: ✅ Criada com sucesso (ID: 1, Nome: "Tecnologia")
2. **Tag**: ✅ Criada com sucesso (ID: 1, Nome: "JavaScript")
3. **Autor**: ✅ Criado com sucesso (ID: 1, Nome: "João Silva")
4. **Post**: ✅ Criado com sucesso (ID: 1, Título: "Meu Primeiro Post")

### Testes de Leitura
1. **Página inicial**: ✅ Retorna lista de posts
2. **Listagem de posts**: ✅ Retorna todos os posts com total
3. **Post individual**: ✅ Retorna dados completos do post
4. **Posts por categoria**: ✅ Retorna categoria e posts relacionados

## Tecnologias Utilizadas

- **TypeScript**: Linguagem principal
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **SQLite3**: Banco de dados
- **tsx**: Executor TypeScript para desenvolvimento

## Como Executar

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Executar em modo desenvolvimento:
   ```bash
   npm run dev
   ```

3. O servidor estará disponível em: `http://localhost:3000`

## Arquivos Principais

- `src/main.ts` - Ponto de entrada e configuração de rotas
- `src/Database/Database.ts` - Gerenciamento do banco de dados
- `src/Model/AbstractModel.ts` - Classe base dos modelos
- `src/Controller/AbstractController.ts` - Classe base dos controladores

## Status do Projeto

✅ **CONCLUÍDO** - Todas as funcionalidades solicitadas foram implementadas e testadas com sucesso.

O sistema está funcional para operações básicas de CRUD em Posts, Categorias, Tags e Autores, com arquitetura MVC bem estruturada e banco de dados SQLite3 integrado.

