require('dotenv').config();
const mongoose = require('mongoose');


const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('Conectado ao MongoDB com sucesso.'))
    .catch((err) => console.error(`Erro ao conectar ao MongoDB: ${err}`));


const dadosSchema = new mongoose.Schema({
    temperatura: Number,
    umidade: Number,
    timestamp: { type: Date, default: Date.now }
});
const DadosSensor = mongoose.model('DadosSensor', dadosSchema);


const salvarDados = async (temperatura, umidade) => {
    try {
        const novoDado = new DadosSensor({ temperatura, umidade });
        await novoDado.save();
        console.log('Dados armazenados no MongoDB');
    } catch (err) {
        console.error(`Erro ao salvar no banco: ${err}`);
    }
};


module.exports = { DadosSensor, salvarDados };
