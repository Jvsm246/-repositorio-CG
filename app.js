import { palavrasIgnoradas } from './stopwords.js';

function limparTexto(texto) {
    return texto
        .toLowerCase()
        .replace(/[.,!?;:()"\n\r]/g, ' ')
        .split(/\s+/)
        .filter(palavra => palavra && !palavrasIgnoradas.includes(palavra));
}

function contarPalavras(lista) {
    const contador = {};
    for (const palavra of lista) {
        contador[palavra] = (contador[palavra] || 0) + 1;
    }
    return contador;
}

function pegarTopPalavras(contador, limite = 10) {
    return Object.entries(contador)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limite);
}

window.analisarTexto = function () {
    const texto = document.getElementById('texto').value;
    const palavras = limparTexto(texto);
    const contagem = contarPalavras(palavras);
    const top = pegarTopPalavras(contagem);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (top.length === 0) {
        resultado.textContent = "Nenhuma palavra-chave encontrada.";
    } else {
        top.forEach(([palavra, freq]) => {
            const p = document.createElement('p');
            p.textContent = `${palavra} — ${freq}x`;
            resultado.appendChild(p);
        });
    }
};
