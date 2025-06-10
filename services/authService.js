const db = require('../db');

async function autenticarUsuario(email, senha) {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM login WHERE email = ? AND senha = ?",
            [email, senha]
        );

        return rows.length > 0;
    } catch (error) {
        console.error("Erro ao acessar o banco:", error);
        throw error; // propaga para a rota tratar
    }
}

module.exports = {
    autenticarUsuario
};