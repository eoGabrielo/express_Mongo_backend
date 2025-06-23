const mongoose =  require('mongoose'); //Import biblioteca "mongoose" para conexão ao banco de dados
require('dotenv').config(); // Carrega as variáveis do .env

const MONGO_URI = process.env.MONGO_URI;//Porta do servidor no arquivo ".env"

//Func async para conexao ao banco de dados, permite uso do await
const connectDB = async () => {
    //try e catch para tentar a conexao e captura erros
    try{
        await mongoose.connect(process.env.MONGO_URI);//Tentativa de conexao com o MongoDB, link do banco de dados usado do "https://www.mongodb.com/", está salvo no arquivo ".env"
        console.log('MongoDB conectado com sucesso.')
    }catch (error) {//Qualquer erro de conexao, cai no catch
        console.error('Error ao conectar com MongoDB', error); //Loga erro no console
        process.exit(1); //Trava o sistema caso o banco de dados falhar!
    }
}

module.exports = connectDB; //Export função de conexao ao banco de dados
