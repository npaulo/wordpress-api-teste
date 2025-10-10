// URL da API pública do teu site WordPress
const API_URL =
  "https://public-api.wordpress.com/wp/v2/sites/npaulo84-fswoq.wordpress.com/pages";

async function carregarPaginas() {
  const lista = document.getElementById("lista-paginas");
  const mensagem = document.getElementById("mensagem");

  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error("Erro ao obter dados da API");

    const paginas = await resposta.json();

    if (!paginas.length) {
      mensagem.textContent = "Nenhuma página encontrada.";
      return;
    }

    mensagem.style.display = "none";

    paginas.forEach((pagina) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${pagina.link}" target="_blank">${pagina.title.rendered}</a>
        ${
          pagina.excerpt?.rendered
            ? `<div>${pagina.excerpt.rendered}</div>`
            : ""
        }
      `;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error(erro);
    mensagem.textContent = "Ocorreu um erro ao carregar as páginas 😕";
  }
}

// Inicia o carregamento
carregarPaginas();
