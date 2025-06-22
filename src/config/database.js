const mongoose =  require('mongoose'); //Import biblioteca "mongoose" para conexão ao banco de dados

//Func async para conexao ao banco de dados, permite uso do await
const connectDB = async () => {
    //try e catch para tentar a conexao e captura erros
    try{
        await mongoose.connect('mongodb+srv://adminProdutos:adminProdutos@clusterprodutos.alvmfzv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterProdutos', {//Tentativa de conexao com o MongoDB, link do banco de dados usado do "https://www.mongodb.com/"
        });
        console.log('MongoDB conectado com sucesso.')
    }catch (error) {//Qualquer erro de conexao, cai no catch
        console.error('Error ao conectar com MongoDB', error); //Loga erro no console
        process.exit(1); //Trava o sistema caso o banco de dados falhar!
    }
}

module.exports = connectDB; //Export função de conexao ao banco de dados