const db = require('../../db');

async function getCurriculoData() {
  const [escolaridade] = await db.query('SELECT * FROM escolaridade');
  const [cursosBase] = await db.query('SELECT * FROM certificados');
  const [eventos] = await db.query('SELECT * FROM eventos');
  const [experienciasBase] = await db.query('SELECT * FROM experiencias');
  const [ferramentas] = await db.query('SELECT nome, classe FROM ferramentas');
  const [tecnicas] = await db.query('SELECT nome FROM tecnicas');
  const [softskills] = await db.query('SELECT nome FROM softskills');

  const cursos = cursosBase.map(curso => ({
    titulo: curso.titulo,
    instituicao: curso.instituicao,
    duracao: `${curso.duracao}h`,
    data: curso.conclusao.toISOString().split('T')[0],
    certificado: curso.link
  }));

  const experiencias = experienciasBase.map(exp => ({
    empresa: exp.empresa,
    cargo: exp.cargo,
    periodo: `${new Date(exp.dataInicio).toLocaleDateString()} a ${exp.dataFinal ? new Date(exp.dataFinal).toLocaleDateString() : 'Atual'}`
  }));

  const habilidades = {
    tecnicas: tecnicas.map(t => t.nome),
    softskills: softskills.map(s => s.nome),
    ferramentas
  };

  return {
    escolaridade,
    cursos,
    eventos,
    experiencias,
    habilidades
  };
}

module.exports = { getCurriculoData };
