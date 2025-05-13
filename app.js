const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

const { getCurriculoData } = require('./models/curriculoModel');
const { getProjetos } = require('./models/projetosModel');
const { getIndexData } = require('./models/indexModel');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const { nome, introducao, contatos } = await getIndexData();
  res.render('index', {
    page: 'index',
    nome,
    introducao,
    contatos,
    anoAtual: new Date().getFullYear()
  });
});

app.get('/projetos', async (req, res) => {
  const projetos = await getProjetos();
  res.render('projetos', {
    page: 'projetos',
    nome: 'Eduardo Fonseca Ribeiro',
    projetos,
    anoAtual: new Date().getFullYear()
  });
});

app.get('/curriculo', async (req, res) => {
  const dados = await getCurriculoData();
  res.render('curriculo', {
    page: 'curriculo',
    nome: 'Eduardo Fonseca Ribeiro',
    ...dados,
    anoAtual: new Date().getFullYear()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});