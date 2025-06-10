// db.js
const mysql = require('mysql2/promise');

// Cria a conexão com o banco de dados
const db = mysql.createPool({
  host: 'localhost',       // ou IP do banco
  user: 'root',     // ex: 'root'
  password: 'eduardo',   // ex: '1234'
  database: 'portifolio', // substitua pelo nome real do banco
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;