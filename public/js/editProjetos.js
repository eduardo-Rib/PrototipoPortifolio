async function deleteItem(btn) {
  const id = btn.getAttribute('data-id');

  if (!id) {
    alert("ID do projeto não encontrado.");
    return;
  }

  if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

  try {
    const response = await fetch(`/deleteProjetos/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      btn.parentElement.remove();
    } else {
      alert("Erro ao excluir projeto.");
    }
  } catch (err) {
    console.error("Erro ao excluir:", err);
    alert("Erro de rede ao tentar excluir.");
  }
}


// public/js/editProjetos.js
async function addProjeto() {
  const titulo = document.getElementById('titulo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const tecnologias = document.getElementById('tecnologias').value.trim();
  const link = document.getElementById('link').value.trim();

  if (!titulo || !descricao || !tecnologias || !link) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const response = await fetch('/includeProjetos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descricao, tecnologias, link })
    });

    if (response.ok) {
      alert("Projeto adicionado com sucesso!");
      location.reload();
    } else {
      alert("Erro ao adicionar projeto.");
    }
  } catch (err) {
    console.error("Erro ao adicionar projeto:", err);
    alert("Erro de rede.");
  }
}


async function editItem(btn) {
  const section = btn.parentElement;
  const id = section.querySelector("button[data-id]").getAttribute("data-id");

  const h3 = section.querySelector("h3");
  const p = section.querySelector("p");
  const a = section.querySelector("a");
  const techTags = Array.from(section.querySelectorAll(".tech-stack .tech-tag"))
    .map(span => span.textContent.trim())
    .join(', ');

  // Substituir elementos por inputs
  const inputTitulo = document.createElement("input");
  inputTitulo.type = "text";
  inputTitulo.value = h3.textContent;

  const inputDescricao = document.createElement("input");
  inputDescricao.type = "text";
  inputDescricao.value = p.textContent;

  const inputLink = document.createElement("input");
  inputLink.type = "text";
  inputLink.value = a.href;

  const inputTecnologias = document.createElement("input");
  inputTecnologias.type = "text";
  inputTecnologias.value = techTags;

  // Substituir no DOM
  h3.replaceWith(inputTitulo);
  p.replaceWith(inputDescricao);
  a.replaceWith(inputLink);
  section.querySelector(".tech-stack").replaceChildren(inputTecnologias);

  // Trocar botão Editar por Salvar
  btn.textContent = "Salvar";
  btn.onclick = async () => {
    const titulo = inputTitulo.value.trim();
    const descricao = inputDescricao.value.trim();
    const link = inputLink.value.trim();
    const tecnologias = inputTecnologias.value.trim();

    if (!titulo || !descricao || !link || !tecnologias) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch(`/projetos/editar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao, link, tecnologias })
      });

      if (response.ok) {
        alert("Projeto atualizado com sucesso!");
        location.reload();
      } else {
        alert("Erro ao atualizar projeto.");
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Erro de rede ao tentar atualizar.");
    }
  };
}