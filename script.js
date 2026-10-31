
// =====================================
// HABILIDADES EXPANSÍVEIS
// =====================================

document.querySelectorAll(".skill-item").forEach(item => {

  const button = item.querySelector(".skill-toggle");
  const content = item.querySelector(".skill-content");
  const symbol = button.querySelector("span");

  // Identificador do conteúdo expansível
  const contentId = "skill-" +
    Array.from(document.querySelectorAll(".skill-item"))
      .indexOf(item);

  content.id = contentId;
  button.setAttribute("aria-controls", contentId);
  button.setAttribute("aria-expanded", "false");

  // Abre e fecha ao clicar
  button.addEventListener("click", () => {

    const isOpen = item.classList.toggle("active");

    button.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    symbol.textContent = isOpen ? "−" : "+";

  });

});


// =====================================
// MINIATURAS DOS CERTIFICADOS
// =====================================

// Se a miniatura não existir, mostra
// o símbolo PDF no lugar da imagem.

document.querySelectorAll(
  ".certificate-preview img"
).forEach(img => {

  img.addEventListener("error", () => {
    img.style.display = "none";
  });

  if (img.complete && img.naturalWidth === 0) {
    img.style.display = "none";
  }

});


// =====================================
// CARREGAMENTO DE PROJETOS DO GITHUB
// =====================================

const reposContainer = document.getElementById("repos");

async function carregarProjetos() {

  try {

    const response = await fetch(
      "https://api.github.com/users/Eliezer151020/repos?sort=updated&per_page=100"
    );

    if (!response.ok) {
      throw new Error("Erro ao consultar o GitHub");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Resposta inesperada do GitHub");
    }

    reposContainer.replaceChildren();

    const projetos = data
      .filter(repo => !repo.fork)
      .slice(0, 6);

    if (projetos.length === 0) {
      reposContainer.textContent =
        "Nenhum projeto público encontrado.";
      return;
    }

    projetos.forEach(repo => {

      const card = document.createElement("div");
      card.className = "card show";

      const titulo = document.createElement("h3");
      titulo.textContent = repo.name;

      const descricao = document.createElement("p");
      descricao.textContent =
        repo.description || "Projeto desenvolvido no GitHub.";

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Ver projeto";

      card.appendChild(titulo);
      card.appendChild(descricao);
      card.appendChild(link);

      reposContainer.appendChild(card);

    });

  } catch (error) {

    console.error("Erro:", error);

    reposContainer.replaceChildren();

    const aviso = document.createElement("p");
    aviso.textContent =
      "Não foi possível carregar os projetos agora.";

    const link = document.createElement("a");
    link.href =
      "https://github.com/Eliezer151020";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Visitar meu GitHub";

    reposContainer.appendChild(aviso);
    reposContainer.appendChild(link);

  }
}

carregarProjetos();
