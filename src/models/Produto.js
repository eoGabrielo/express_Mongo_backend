const mongoose = require('mongoose'); //Biblioteca mongoose MongoDB.

const ProdutosSchema = new mongoose.Schema({ //Definição de como os dados vão para o banco de dados com seus tipos e regras.
    nome:{
        type: String, //Tipo do campo.
        required: true //Campo obrigatório.
    },
    descricao:{
        type: String,
        required: true
    },
    codigo:{
        type: String,
        required: true,
        unique: true //Campo único.
    },
    preco:{
        type: Number
    },
    estoque:{
        type: Number, //Tipo Int
        required: true
    },
})

const Produto = mongoose.model('Produto', ProdutosSchema) //Cria um modelo Mongoose chamado Produto, com base na estrutura definida em ProdutosSchema.
//Usaremos, por exemplo, Produto.(algumaCoisa) para interagir com o banco de dados, adicionar, remover ou lista, utilizando as funçoes da biblioteca mongoose.

module.exports = Produto; //Exportar funçao de interação com o banco de dados