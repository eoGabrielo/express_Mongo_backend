const express = require('express'); //Import Biblioteca para criar servidor e rotas HTTP.
const connectDB = require('./config/database'); //Import arquivo com conecxão ao banco de dados MongoDB.
const Produto = require('./models/Produto'); //Modelo de interação com o banco de dados, usaremos "Produto..." pro CRUD.
const path = require('path');//Auxiliar Express no caminho das pastas
require('dotenv').config(); // Carrega as variáveis do .env




const app =  express(); // Variavel que recebe funçoes da biblioteca para criar servidor e rotas HTTP.

connectDB() //Conectar ao banco.

//Indica ao express arquivos staticos para rodar no navegador
app.use(express.static(path.join(__dirname, 'public')));//Garante o caminho certo para acessar a pasta 'public' dentro da pasta do arquivo app.js.
app.use(express.json())//Garantir que o servidor consiga ler JSON.

//Rota teste GET quando for acessado '/' na web.
//app.get('/', (req, res) => {
//    res.send('Ta rodando, GABRIEL');
//});

const MONGO_URI = process.env.MONGODB_URI;//Porta do servidor no arquivo ".env"
const PORT = process.env.PORT || 3000; //Porta do servidor no arquivo ".env"


app.post('/produtos', async(req, res) =>{
    try{
        //req.body: onde ficam os dados enviados pelo usuario, normalmente no formato JSON
        //Pegando valores enviado pelo usuario via post, se o usuario não enviar nada, req.body vai ser vazio ou undefined.
        const nome = req.body.nome;
        const descricao = req.body.descricao;
        const codigo = req.body.codigo;
        const preco = req.body.preco;
        const estoque = req.body.estoque;

        const novoProduto = new Produto({//Objeto que recebe valores do req.body.
            nome: nome,
            descricao: descricao,
            codigo: codigo,
            preco: preco,
            estoque: estoque
});

        const produtoSalvo = await novoProduto.save(); //Enviando objeto com dados do produto salvos para o MongoDB.

        res.json(produtoSalvo);//retorna um JSON para o servidor, para verificar se os dados foram corretos.
    }catch (error){
            res.send(error.message)//captura e retornar o erro que pode acontecer ao enviar para o banco de dados.
        };
    }
);

//Rota GET para retornar produtos cadastrados
app.get('/produtos', async (req, res)=>{
    try{
        const produtos =  await Produto.find();// Busca todos os documentos no banco de dados.
        res.json(produtos);//Retornar array dos produtos em JSON.
    }catch(error){
        res.json({//Retorna erro se a busca falhar.
            erro: 'Erro ao buscar produtos',
            detalhes: error.message
        });
    }
});

//Rota para buscar produto especifico pela chave id criada automatica pelo banco de dados MongoDB.
app.get('/produtos/:id', async (req, res) => {
  try {
    const id = req.params.id; // Pega o ID da URL
    const produto = await Produto.findById(id); // Busca no banco de dados pelo ID.

    if (!produto) {//Se o valor for falso, retornar um erro em JSON.
      return res.json({ erro: 'Produto não encontrado' });
    }else//Se existir valor, retornar o produto em JSON.
        res.json(produto); 
  } catch (error) {//Se a resposta ao banco de dados der erro.
    res.json({ erro: 'Erro ao buscar produto', detalhes: error.message });
  }
});

//Rota para excluir produto pelo id.
app.delete('/produtos/:id', async (req, res) => {
  try {
    const id = req.params.id; // Pega o id da URL.
    const produto = await Produto.findByIdAndDelete(id); // Tenta deletar no banco.

    if (!produto) {// Se não achar o produto pelo id, retorna erro.
      return res.json({ erro: 'Produto não encontrado' });
      
    }else//Se achar o produto, confirma remoção.
        res.json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    res.json({ erro: 'Erro ao deletar produto', detalhes: error.message }); // Erro geral.
  }
});

//Rota para Atualizar estoque do produto.

app.patch('/produtos/:id/estoque', async (req, res) =>{
  try{
    const id = req.params.id;
    const novoEstoque = Number(req.body.estoque)

    const produtoAtualizado = await Produto.findByIdAndUpdate(id,
    {estoque: novoEstoque},
    {new: true});

    if (!produtoAtualizado){
      return res.json({erro: 'Produto não encontrado'})
    }else{
    res.json(produtoAtualizado);}
  
  }catch(error){
    res.json({erro: 'Erro ao atualizar estoque', detalhes: error.message});
  }
});



//Quando iniciar o servidor retornar um callback no console.log
app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT + ".");
    console.log('Link do servidor-> http://localhost:3000/formulario.html?")')
});


