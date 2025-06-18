const express = require('express'); //Import Biblioteca para criar servidores web, rotas e respostas HTTP

const app =  express(); // Variavel que recebe funçoes da biblioteca para criar servidor e suas rotas

//Rota GET quando for acessado '/' na web para mostrar essa resposta.
//req(request): Recebida / res(response) Enviar 
app.get('/', (req, res) => {
    res.send('API Funcionando'); //Enviar texto
});

const PORT = 3000; //Porta do servidor

//Express inicia o servidor na porta e retorna um callback console.log...
app.listen(PORT, () => {
    console.log('Servidor rodando na porta' + PORT )
});