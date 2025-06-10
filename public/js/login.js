async function login(event) {
    event.preventDefault();

    const email = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (email !== "" && senha !== "") {
        try {
            const response = await fetch("/verifyLogin", { // ✅ URL corrigida (relativa)
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            // Verifica se a resposta foi ok antes de fazer .json()
            if (!response.ok) {
                throw new Error("Usuário ou senha inválidos.");
            }

            const data = await response.json();

            if (data.autenticado === true) {
                localStorage.setItem("logado", "true");
                window.location.href = "/adm/projetos"; // ✅ redireciona para a página de admin
            } else {
                alert("Usuário ou senha incorretos!");
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao tentar logar: " + error.message);
        }
    } else {
        alert("Preencha todos os campos.");
    }
}