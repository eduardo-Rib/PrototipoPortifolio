const db = require('../../db');

async function getIndexData() {
  const [mainRows] = await db.query('SELECT * FROM main LIMIT 1');
  const [contatoRows] = await db.query('SELECT * FROM contatos LIMIT 1');

  const main = mainRows[0];
  const contatos = contatoRows[0];

  return {
    nome: main.nome,
    introducao: {
      bio: main.introducao,
      imagem: main.imagem
    },
    contatos: {
      emails: [
        { nome: contatos.emailPessoal, classe: 'pessoal' },
        { nome: contatos.emailAcademico, classe: 'acadêmico' },
        { nome: contatos.emailProfissional, classe: 'profissional' }
      ],
      whatsapp: contatos.whatsapp,
      links: [
        { nome: 'LinkedIn', url: contatos.linkedin, classe: 'linkedin-btn' },
        { nome: 'GitHub', url: contatos.github, classe: 'github-btn' }
      ]
    }
  };
}

module.exports = { getIndexData };
