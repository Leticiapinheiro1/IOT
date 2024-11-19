const express = require('express');
const cors = require('cors');
const app = express();
const { DadosSensor } = require('./db');  // Importar o modelo do db.js

const port = 3000;
app.use(cors());
app.use(express.json());
// Rota para obter todos os dados
app.get('/dados', async (req, res) => {
    try {
        const dados = await DadosSensor.find({});
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota para obter os últimos valores de temperatura e umidade
app.get('/dados/ultimos', async (req, res) => {
    try {
        const ultimoDado = await DadosSensor.findOne().sort({ timestamp: -1 });
        res.json(ultimoDado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota para adicionar um novo registro de temperatura e umidade (para teste)
app.post('/dados', async (req, res) => {
    const { temperatura, umidade } = req.body;
    try {
        const novoDado = new DadosSensor({ temperatura, umidade });
        await novoDado.save();
        res.status(201).json(novoDado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});


// Iniciar o Servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
