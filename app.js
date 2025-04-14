const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { page: 'index' });
});

app.get('/projetos', (req, res) => {
    res.render('projetos', { page: 'projetos' });
});

app.get('/curriculo', (req, res) => {
    res.render('curriculo', { page: 'curriculo' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
