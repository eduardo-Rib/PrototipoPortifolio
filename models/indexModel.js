const db = require('../db');

async function getIndexData() {
  const [[main]] = await db.query('SELECT nome, introducao, imagem FROM main LIMIT 1');
  const [contato] = await db.query('SELECT * FROM contatos LIMIT 1');

  const introducao = {
    bio: main.introducao,
    imagem: main.imagem
  };

  const contatos = {
    emails: [
      { nome: contato.emailPessoal, classe: 'pessoal' },
      { nome: contato.emailAcademico, classe: 'acadêmico' },
      { nome: contato.emailProfissional, classe: 'profissional' }
    ],
    whatsapp: contato.whatsapp,
    links: [
      { nome: 'LinkedIn', url: contato.linkedin, classe: 'linkedin-btn' },
      { nome: 'GitHub', url: contato.github, classe: 'github-btn' }
    ]
  };

  return {
    nome: main.nome,
    introducao,
    contatos
  };
}

module.exports = { getIndexData };
