const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../services/authService');

router.post('/verifyLogin', async (req, res) => {
    const { email, senha } = req.body;

    console.log("🔐 Tentando autenticar:", email, senha); // 👈 log útil

    try {
        const autenticado = await autenticarUsuario(email, senha);

        if (autenticado) {
            req.session.autenticado = true;
            req.session.usuario = email;
            console.log("✅ Login bem-sucedido");
            return res.json({ autenticado: true });
        } else {
            console.warn("⚠️ Usuário ou senha inválidos");
            return res.status(401).json({ autenticado: false });
        }
    } catch (error) {
        console.error("❌ Erro no login:", error); // 👈 log do erro real
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Erro ao destruir sessão:", err);
            return res.status(500).send("Erro ao fazer logout");
        }
        res.redirect('/adm'); // Redireciona para login após logout
    });
});

module.exports = router;