const express = require('express'); //Import Biblioteca para criar servidor e rotas HTTP.
const connectDB = require('./config/database'); //Import arquivo com conecxão ao banco de dados MongoDB.
const Cliente = require('./models/Cliente'); //Modelo de interação com o banco de dados, usaremos "Cliente..." pro CRUD.
const path = require('path');//Auxiliar Express no caminho das pastas


const app =  express(); // Variavel que recebe funçoes da biblioteca para criar servidor e rotas HTTP.

connectDB() //Conectar ao banco.

//Indica ao express arquivos staticos para rodar no navegador
app.use(express.static(path.join(__dirname, 'public')));//Garante o caminho certo para acessar a pasta 'public' dentro da pasta do arquivo app.js.
app.use(express.json())//Garantir que o servidor consiga ler JSON.

//Rota teste GET quando for acessado '/' na web.
app.get('/', (req, res) => {
    res.send('Ta rodando, GABRIEL');
});

const PORT = 3000; //Porta do servidor


app.post('/clientes', async(req, res) =>{
    try{
        //req.body: onde ficam os dados enviados pelo usuario, normalmente no formato JSON
        //Pegando valores enviado pelo cliente via post, se o cliente não enviar nada, req.body vai ser vazio ou undefined.
        const nome = req.body.nome;
        const email = req.body.email;
        const telefone = req.body.telefone;
        const dataNascimento = req.body.dataNascimento;
        const ativo = req.body.ativo;

        const novoCliente = new Cliente({//Objeto que recebe valores do req.body.
            nome: nome,
            email: email,
            telefone: telefone,
            dataNascimento: dataNascimento,
            ativo: ativo
});

        const clienteSalvo = await novoCliente.save(); //Enviando objeto com dados do cliente salvos para o MongoDB.

        res.json(clienteSalvo);//retorna um JSON para o servidor, para verificar se os dados foram corretos.
    }catch (error){
            res.send(error.message)//captura e retornar o erro que pode acontecer ao enviar para o banco de dados.
        };
    }
);

//Rota GET para retornar clientes cadastrados
app.get('/clientes', async (req, res)=>{
    try{
        const clientes =  await Cliente.find();// Busca todos os documentos no banco de dados.
        res.json(clientes);//Retornar array dos clientes em JSON.
    }catch(error){
        res.json({//Retorna erro se a busca falhar.
            erro: 'Erro ao buscar clientes',
            detalhes: error.message
        });
    }
});

//Rota para buscar cliente especifico pela chave id criada automatica pelo banco de dados MongoDB.
app.get('/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id; // Pega o ID da URL
    const cliente = await Cliente.findById(id); // Busca no banco de dados pelo ID.

    if (!cliente) {//Se o valor for falso, retornar um erro em JSON.
      return res.json({ erro: 'Cliente não encontrado' });
    }else//Se existir valor, retornar o cliente em JSON.
        res.json(cliente); 
  } catch (error) {//Se a resposta ao banco de dados der erro.
    res.json({ erro: 'Erro ao buscar cliente', detalhes: error.message });
  }
});

//Rota para excluir cliente pelo id.
app.delete('/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id; // Pega o id da URL.
    const cliente = await Cliente.findByIdAndDelete(id); // Tenta deletar no banco.

    if (!cliente) {// Se não achar o cliente pelo id, retorna erro.
      return res.json({ erro: 'Cliente não encontrado' });
    }else//Se achar o cliente, confirma remoção.
        res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.json({ erro: 'Erro ao deletar cliente', detalhes: error.message }); // Erro geral.
  }
});



//Quando iniciar o servidor retornar um callback no console.log
app.listen(PORT, () => {
    console.log('Servidor rodando na porta' + PORT )
});


