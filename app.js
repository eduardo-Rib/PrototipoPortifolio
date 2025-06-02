
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Rotas API para edição dinâmica

app.get('/curriculo', async (req, res) => {
  const dados = await getCurriculoData();
  res.render('curriculo', {
    page: 'curriculo',
    nome: 'Eduardo Fonseca Ribeiro',
    ...dados,
    anoAtual: new Date().getFullYear()
  });
});

// CURRÍCULO
app.post('/api/curriculo', async (req, res) => {
  const { tipo, data } = req.body;
  res.json({ status: 'ok', message: 'Entrada adicionada (mock)' });
});

app.put('/api/curriculo/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo, data } = req.body;
  res.json({ status: 'ok', message: `Entrada ${id} atualizada (mock)` });
});

app.delete('/api/curriculo/:id', async (req, res) => {
  const { id } = req.params;
  res.json({ status: 'ok', message: `Entrada ${id} deletada (mock)` });
});

// PROJETOS
app.post('/api/projetos', async (req, res) => {
  const { titulo, descricao, tecnologias, link } = req.body;
  res.json({ status: 'ok', message: 'Projeto adicionado (mock)' });
});

app.put('/api/projetos/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, tecnologias, link } = req.body;
  res.json({ status: 'ok', message: `Projeto ${id} atualizado (mock)` });
});

app.delete('/api/projetos/:id', async (req, res) => {
  const { id } = req.params;
  res.json({ status: 'ok', message: `Projeto ${id} deletado (mock)` });
});

// CONTATOS
app.post('/api/contatos', async (req, res) => {
  const { tipo, valor } = req.body;
  res.json({ status: 'ok', message: 'Contato adicionado (mock)' });
});

app.put('/api/contatos/:id', async (req, res) => {
  const { id } = req.params;
  const { tipo, valor } = req.body;
  res.json({ status: 'ok', message: `Contato ${id} atualizado (mock)` });
});

app.delete('/api/contatos/:id', async (req, res) => {
  const { id } = req.params;
  res.json({ status: 'ok', message: `Contato ${id} deletado (mock)` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});
