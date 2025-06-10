const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();
const path = require('path');

// Funções auxiliares para carregar dados das páginas
const { getCurriculoData } = require('./public/js/getCurriculo');
const { getProjetos } = require('./public/js/getProjetos');
const { getIndexData } = require('./public/js/getIndex');
const protegerRota = require('./middlewares/auth');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para interpretar JSON e form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⚠️ Sessão precisa vir antes das rotas
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// ⚠️ Rotas que usam req.session devem vir depois da sessão
const loginRoute = require('./routes/loginRoute');
app.use('/', loginRoute); // Disponibiliza /verifyLogin

const projetosRoute = require('./routes/projetosRoute');
app.use('/', projetosRoute); // Ativa as rotas de projetos


// Rotas principais do site público
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

// Página de login (GET)
app.get('/adm', async (req, res) => {
  res.render('login', {
    page: 'login',
    nome: 'Eduardo Fonseca Ribeiro',
    anoAtual: new Date().getFullYear()
  });
});


app.get('/adm/projetos', protegerRota, async (req, res) => {
  const projetos = await getProjetos();
  res.render('editProjetos', {
    page: 'projetos',
    nome: 'Eduardo Fonseca Ribeiro',
    projetos,
    anoAtual: new Date().getFullYear()
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});