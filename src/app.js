const express = require('express'); //Import Biblioteca para criar servidores web, rotas e respostas HTTP
const connectDB = require('./config/database'); //Import arquivo com conecxão ao banco de dados  MongoDB
const Cliente = require('./models/Cliente'); //Modelo de interação com o banco de dados, usaremos "Cliente..." pro CRUD.


const app =  express(); // Variavel que recebe funçoes da biblioteca para criar servidor e suas rotas

connectDB() //Conectar ao banco

//Rota GET quando for acessado '/' na web para mostrar essa resposta.
//req(request): Recebida / res(response) Enviar 
app.get('/', (req, res) => {
    res.send('API Funcionando'); //Enviar texto
});

const PORT = 3000; //Porta do servidor

app.use(express.json()) // Garantir que o servidor consiga ler JSON

app.post('/clientes', async(req, res) =>{
    try{
        const {nome, email, telefone, dataNascimento, ativo} = req.body;

        const novoCliente = new Cliente({//Objeto 
            nome,
            email,
            telefone,
            dataNascimento,
            ativo
        })

        const clienteSalvo = await novoCliente.save(); // salvando esse novo cliente no banco MongoDB.

        res.json(clienteSalvo);//respondendo para o cliente com os dados salvos, envia um objeto JSON como resposta
    }catch (error){
            res.send(error.message)//captura erros que possam ocorrer durante a criação ou o salvamento.
        };
    }
);

app.get('/clientes', async (req, res)=>{
    try{
        const clientes =  await Cliente.find();// Busca todos os documentos no banco de dados
        res.json(clientes); // Envia o array de clientes em JSON
    }catch(error){
        res.json({
            erro: 'Erro ao buscar clientes',
            detalhes: error.message
        });
    }
});

app.get('/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id; // Pega o ID da URL
    const cliente = await Cliente.findById(id); // Busca no banco pelo ID

    if (!cliente) {
      return res.json({ erro: 'Cliente não encontrado' }); // Se não achar
    }else
        res.json(cliente); // Retorna o cliente em JSON
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar cliente', detalhes: error.message }); // Erro geral
  }
});

app.delete('/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id; // Pega o ID da URL
    const cliente = await Cliente.findByIdAndDelete(id); // Tenta deletar no banco

    if (!cliente) {
      return res.json({ erro: 'Cliente não encontrado' }); // Se não achar, retorna erro
    }else
        res.json({ mensagem: 'Cliente deletado com sucesso' }); // Confirma remoção
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar cliente', detalhes: error.message }); // Erro geral
  }
});



//Express inicia o servidor na porta e retorna um callback console.log...
app.listen(PORT, () => {
    console.log('Servidor rodando na porta' + PORT )
});


