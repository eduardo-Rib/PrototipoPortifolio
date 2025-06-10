const db = require('../../db');

async function getProjetos() {
  const [projetosBase] = await db.query('SELECT * FROM projetos');
  const projetos = [];

  for (const proj of projetosBase) {
    const [tecs] = await db.query(`
      SELECT t.nome, t.classe
      FROM tecnologiasProjetos tp
      JOIN tecnologias t ON t.codigo = tp.codigoTecnologia
      WHERE tp.codigoProjeto = ?
    `, [proj.codigo]);

    projetos.push({
      codigo: proj.codigo, // <-- Aqui está o ID do projeto
      titulo: proj.titulo,
      descricao: proj.descricao,
      link: proj.link,
      tecnologias: tecs
    });
  }

  return projetos;
}

module.exports = { getProjetos };