# 🛍️ Cadastro de Produtos - API REST com Node.js, Express e MongoDB

Este é um projeto completo de **cadastro de produtos**, com frontend responsivo e backend em Node.js + Express, integrando com banco de dados MongoDB Atlas. Os usuários podem:

- Cadastrar produtos com nome, descrição, preço, código e estoque.
- Visualizar a lista de produtos cadastrados.
- Atualizar o estoque de cada item (aumentar ou diminuir).
- Excluir produtos do sistema.

---

## 🚀 Tecnologias Utilizadas

| Camada         | Tecnologias                                               |
|----------------|------------------------------------------------------------|
| **Frontend**   | HTML5, CSS3 (responsivo), JavaScript Vanilla              |
| **Backend**    | Node.js, Express.js                                        |
| **Banco de Dados** | MongoDB Atlas (com Mongoose ODM)                     |
| **Deploy**     | Render.com (deploy automático do backend)                 |

---

## 📂 Estrutura do Projeto

```
src/
├── config/
│   └── database.js        # Conexão com MongoDB
├── models/
│   └── Produto.js         # Schema Mongoose do Produto
├── public/
│   ├── formulario.html    # Página para cadastro
│   ├── produtos.html      # Página de listagem
│   ├── style.css          # Estilo do formulário
│   └── styleProdutos.css  # Estilo da listagem
├── .env                   # Variáveis de ambiente (MONGO_URI, PORT)
├── app.js                 # Arquivo principal do servidor Express
```

---

## 🔧 Como rodar localmente

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o arquivo `.env`:**
Crie um arquivo `.env` na raiz com:

```
PORT=3000
MONGO_URI=sua_string_de_conexao_mongodb_atlas
```

4. **Inicie o servidor:**
```bash
npm start
```

5. **Acesse no navegador:**
```
http://localhost:3000/formulario.html
```

---

## 🌐 API - Endpoints

| Método | Rota                        | Descrição                        |
|--------|-----------------------------|----------------------------------|
| GET    | `/produtos`                 | Lista todos os produtos          |
| GET    | `/produtos/:id`             | Retorna um produto específico    |
| POST   | `/produtos`                 | Cadastra um novo produto         |
| DELETE | `/produtos/:id`             | Deleta um produto pelo ID        |
| PATCH  | `/produtos/:id/estoque`     | Atualiza o estoque de um produto |

---

## 📱 Frontend Responsivo

O projeto conta com duas páginas HTML:

- `formulario.html`: para **cadastrar** produtos.
- `produtos.html`: para **visualizar, excluir e atualizar estoque**.

As páginas foram estilizadas com CSS moderno e responsivo para boa visualização em dispositivos móveis.

---

## ✅ Funcionalidades

- [x] Cadastro com validação de campos
- [x] Listagem dinâmica (fetch API)
- [x] Atualização de estoque via botões
- [x] Exclusão com confirmação
- [x] Feedback de erro ou sucesso na interface
- [x] Backend estruturado com Mongoose
- [x] Deploy gratuito com Render

---

## 👨‍💻 Autor

**Gabrielo**  
Projeto pessoal com foco em praticar o desenvolvimento completo de uma aplicação com Node.js e MongoDB.

---

## 📄 Licença

Este projeto é livre para fins de estudo e aprendizado.

---

Deploy: https://express-mongo-backend.onrender.com/formulario.html
