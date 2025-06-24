# Cadastro de Produtos - API

Projeto API REST com Node.js, Express e MongoDB, integrada a uma interface HTML/CSS para cadastro, listagem e gerenciamento de produtos.

## Funcionalidades

Cadastro de produtos via formulário HTML
Listagem de produtos cadastrados
Exclusão de produtos individualmente
Atualização de estoque com botões + e -

## Tecnologias Utilizadas

### Backend

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

### Frontend

* HTML5
* CSS3 (com responsividade)
* JavaScript (fetch API para comunicação com o backend)

### Outros

* [dotenv](https://www.npmjs.com/package/dotenv) para variáveis de ambiente

## Rotas da API

### Criar produto

**POST** `/produtos`

```json
{
  "nome": "Produto A",
  "descricao": "Descricao do produto",
  "codigo": "001",
  "preco": "99.90",
  "estoque": 10
}
```

### Listar todos os produtos

**GET** `/produtos`

### Buscar um produto por ID

**GET** `/produtos/:id`

### Deletar produto por ID

**DELETE** `/produtos/:id`

### Atualizar estoque de um produto

**PATCH** `/produtos/:id/estoque`

```json
{
  "estoque": 15
}
```

## Interface HTML

* `formulario.html`: Permite cadastrar novos produtos.
* `produtos.html`: Exibe todos os produtos cadastrados com opção de excluir e atualizar estoque.


Deploy: [https://express-mongo-backend.onrender.com](https://express-mongo-backend.onrender.com/formulario.html)
