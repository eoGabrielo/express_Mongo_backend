const mongoose =  require('mongoose'); //Import biblioteca banco de dados para o crud

//Func async para conexao ao banco dedados, permite uso do await
const connectDB = async () => {
    //try e catch tenta a conexao e captura erros
    try{
        //Tentativa de conexao com o MongoDB
        await mongoose.connect('mongodb+srv://gabrielobank:qKs01IAZVw14vvLJ@gabrielo.qymc21h.mongodb.net/', {
            useNewUrlParse: true, //Garantir compatibilidade e evitar warnings
            useUniFiedTopology: true, //Garantir compatibilidade e evitar warnings
        });
        console.log('MongoDB conectado com sucesso')
        //Qualquer erro de conexao, cai no catch
    }catch (error) {
        console.error('Error ao conectar com MongoDB', error);
        process.exit(1); //Trava o sistema caso o banco de dados falhar!!
    }
}

module.exports = connectDB; //Export função de conexao ao banco de dados