const catalogo = document.getElementById("catalogo");

function criarFicha(filme, filmes) {
    const ficha = document.createElement("article");
    ficha.className = "filme";

    let cor = "verde";
    if (filme.classificacao > 14 && filme.classificacao < 18) {
        cor = "amarelo";
    } else if (filme.classificacao >= 18) {
        cor = "vermelho";
    }

    let estrelas = "";
    let soma = 0;
    filme.opinioes.forEach(opiniao => {
        soma += opiniao.rating;
    });
    const media = filme.opinioes.length ? Math.round(soma / filme.opinioes.length) : 0;
    for (let i = 0; i < 5; i++) {
        estrelas += i < media ? "★" : "☆";
    }

    const semelhantes = filme.titulosSemelhantes.map(id => {
        const encontrado = filmes.find(item => item.id === id);
        return encontrado ? encontrado.titulo : "";
    });

    let opinioes = "";
    filme.opinioes.forEach(opiniao => {
        opinioes += `<p class="opiniao">${"★".repeat(opiniao.rating)} ${opiniao.descricao}</p>`;
    });

    ficha.innerHTML = `
        <img src="${filme.figura}" alt="Imagem de ${filme.titulo}">
        <div class="conteudo">
            <div class="titulo">
                <h2>${filme.titulo}</h2>
                <span class="faixa ${cor}">${filme.classificacao === 0 ? "Livre" : filme.classificacao + "+"}</span>
            </div>
            <div class="estrelas">${estrelas}</div>
            <p>${filme.resumo}</p>
            <h3>Gêneros</h3><p>${filme.generos.join(", ")}</p>
            <h3>Elenco</h3><p>${filme.elenco.join(", ")}</p>
            <h3>Títulos semelhantes</h3><p>${semelhantes.length ? semelhantes.join(", ") : "Nenhum"}</p>
            <h3>Opiniões</h3>${opinioes || "<p>Sem opiniões.</p>"}
        </div>
    `;
    catalogo.appendChild(ficha);
}

function carregarFilmes() {
    fetch("https://rafaelescalfoni.github.io/desenv_web/filmes.json")
        .then(resposta => {
            if (!resposta.ok) throw new Error("Não foi possível carregar os filmes.");
            return resposta.json();
        })
        .then(filmes => {
            console.log(filmes);
            catalogo.innerHTML = "";
            filmes.forEach(filme => criarFicha(filme, filmes));
        })
        .catch(erro => {
            catalogo.innerHTML = "<p>Erro ao carregar o catálogo.</p>";
            console.error(erro);
        });
}

carregarFilmes();
