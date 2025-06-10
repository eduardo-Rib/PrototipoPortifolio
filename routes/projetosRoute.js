const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /projetos
router.post('/includeProjetos', async (req, res) => {
  const { titulo, descricao, tecnologias, link } = req.body;

  const conn = await db.getConnection(); // ou db.promise().getConnection() dependendo da lib
  await conn.beginTransaction();

  try {
    // 1. Inserir projeto
    const [result] = await conn.execute(
      'INSERT INTO projetos (titulo, descricao, link) VALUES (?, ?, ?)',
      [titulo, descricao, link]
    );
    const codigoProjeto = result.insertId;

    const tecnologiaArray = tecnologias.split(',').map(t => t.trim());

    for (const nome of tecnologiaArray) {
      // 2. Verifica se tecnologia já existe
      let [rows] = await conn.execute(
        'SELECT codigo FROM tecnologias WHERE nome = ?',
        [nome]
      );

      let codigoTecnologia;

      if (rows.length > 0) {
        codigoTecnologia = rows[0].codigo;
      } else {
        // 3. Insere nova tecnologia com classe padrão
        const [tecnologiaInserida] = await conn.execute(
          'INSERT INTO tecnologias (nome, classe) VALUES (?, ?)',
          [nome, 'default']
        );
        codigoTecnologia = tecnologiaInserida.insertId;
      }

      // 4. Relaciona tecnologia ao projeto
      await conn.execute(
        'INSERT INTO tecnologiasProjetos (codigoProjeto, codigoTecnologia) VALUES (?, ?)',
        [codigoProjeto, codigoTecnologia]
      );
    }

    await conn.commit();
    conn.release();

    res.status(201).json({ sucesso: true, mensagem: 'Projeto adicionado com sucesso' });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error('❌ Erro ao inserir projeto:', err);
    res.status(500).json({ erro: 'Erro ao inserir projeto' });
  }
});


// DELETE /projetos/:id
router.delete('/deleteProjetos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Primeiro, remove a ligação entre o projeto e as tecnologias (opcional se o CASCADE estiver ativo)
    await db.execute('DELETE FROM tecnologiasProjetos WHERE codigoProjeto = ?', [id]);

    // Depois, remove o projeto
    await db.execute('DELETE FROM projetos WHERE codigo = ?', [id]);

    res.status(200).json({ sucesso: true });
  } catch (err) {
    console.error('❌ Erro ao deletar projeto:', err);
    res.status(500).json({ erro: 'Erro ao deletar projeto' });
  }
});


router.put('/projetos/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, link, tecnologias } = req.body;

  try {
    await db.query('UPDATE projetos SET titulo = ?, descricao = ?, link = ? WHERE codigo = ?', [titulo, descricao, link, id]);

    await db.query('DELETE FROM tecnologiasProjetos WHERE codigoProjeto = ?', [id]);

    const techArray = tecnologias.split(',').map(t => t.trim());
    for (const nome of techArray) {
      let [rows] = await db.query('SELECT codigo FROM tecnologias WHERE nome = ?', [nome]);
      let codigoTecnologia;

      if (rows.length > 0) {
        codigoTecnologia = rows[0].codigo;
      } else {
        const [result] = await db.query('INSERT INTO tecnologias (nome) VALUES (?)', [nome]);
        codigoTecnologia = result.insertId;
      }

      await db.query('INSERT INTO tecnologiasProjetos (codigoProjeto, codigoTecnologia) VALUES (?, ?)', [id, codigoTecnologia]);
    }

    res.status(200).json({ sucesso: true });
  } catch (err) {
    console.error("Erro ao atualizar projeto:", err);
    res.status(500).json({ erro: 'Erro ao atualizar projeto.' });
  }
});

module.exports = router; // ✅ isso é essencial!