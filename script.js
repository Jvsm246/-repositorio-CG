import { palavrasRuins } from './palavrasRuins.js';

function limparTexto(texto) {
    return texto
        .toLowerCase()
        .replace(/[.,!?;:()"“”‘’\n\r]/g, ' ')
        .split(/\s+/)
        .filter(palavra => palavra && !palavrasRuins.includes(palavra));
}

function contarPalavras(lista) {
    const contagem = {};
    lista.forEach(palavra => {
        contagem[palavra] = (contagem[palavra] || 0) + 1;
    });
    return contagem;
}

function extrairMaisFrequentes(contagem, limite = 10) {
    return Object.entries(contagem)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limite);
}

document.getElementById('botao-palavrachave').addEventListener('click', () => {
    const texto = document.getElementById('entrada-de-texto').value;
    const palavras = limparTexto(texto);
    const contagem = contarPalavras(palavras);
    const top = extrairMaisFrequentes(contagem);

    const resultadoDiv = document.getElementById('resultado-palavrachave');
    resultadoDiv.innerHTML = '';

    if (top.length === 0) {
        resultadoDiv.textContent = 'Nenhuma palavra-chave encontrada.';
    } else {
        top.forEach(([palavra, freq]) => {
            const linha = document.createElement('p');
            linha.textContent = `${palavra} — ${freq}x`;
            resultadoDiv.appendChild(linha);
        });
    }
});
