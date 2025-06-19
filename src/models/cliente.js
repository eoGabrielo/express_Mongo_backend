const mongoose = require('mongoose'); //Biblioteca mongoose MongoDB.

const ClienteSchema = new mongoose.Schema({ //Definição de como os dados vão para o banco de dados com seus tipos e regras.
    nome:{
        type: String, //Tipo do campo.
        required: true //Campo obrigatório.
    },
    email:{
        type: String,
        required: true,
        unique: true //Campo único.
    },
    telefone:{
        type: String,
        required: true
    },
    dataNascimento:{
        type: Date
    },
    ativo:{
        type: Boolean,
        required: true
    },
})

const Cliente = mongoose.model('Cliente', ClienteSchema) //Cria um modelo Mongoose chamado Cliente, com base na estrutura definida em ClienteSchema.
//Usaremos, por exemplo, Cliente.(algumaCoisa) para interagir com o banco de dados, adicionar, remover ou lista, utilizando as funçoes da biblioteca mongoose.

module.exports = Cliente; //Exportar funçao de interação com o banco de dados