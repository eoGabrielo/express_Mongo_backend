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

        const novoCliente = new Cliente({
            nome,
            email,
            telefone,
            dataNascimento,
            ativo
        })

        const clienteSalvo = await novoCliente.save();

        res.json(clienteSalvo);
    }catch (error){
            res.send(error.message)
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

//Express inicia o servidor na porta e retorna um callback console.log...
app.listen(PORT, () => {
    console.log('Servidor rodando na porta' + PORT )
});


