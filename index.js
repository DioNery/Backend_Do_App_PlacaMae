const { Appwrite } = require('appwrite');

// Configurar o cliente Appwrite
const appwrite = new Appwrite();

appwrite
  .setEndpoint('https://api.appwrite.io') // Endpoint da API do Appwrite
  .setProject('SEU_ID_DO_PROJETO') // ID do seu projeto Appwrite
  .setKey('SUA_CHAVE_SECRETA'); // Sua chave secreta de API

const collectionId = 'ID_DA_COLECAO'; // Substitua pelo ID da coleção do Appwrite

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Rota para criar um novo documento
app.post('/api/document', async (req, res) => {
  try {
    const { data } = req.body;
    const result = await appwrite.database.createDocument(collectionId, data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um documento por ID
app.get('/api/document/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await appwrite.database.getDocument(collectionId, id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um documento por ID
app.put('/api/document/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const result = await appwrite.database.updateDocument(collectionId, id, data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para excluir um documento por ID
app.delete('/api/document/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await appwrite.database.deleteDocument(collectionId, id);
    res.json({ message: 'Documento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
