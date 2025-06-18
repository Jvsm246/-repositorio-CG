import { palavrasRuins } from './js/palavrasRuins.js';

const entrada = document.getElementById('entrada-de-texto');
const botao = document.getElementById('botao-palavrachave');
const resultado = document.getElementById('resultado-palavrachave');

botao.addEventListener('click', () => {
  const texto = entrada.value.toLowerCase();
  const palavras = texto.match(/\\b[\\wÀ-ÿ']+\\b/g) || [];
  const frequencia = {};

  palavras.forEach(palavra => {
    if (!palavrasRuins.includes(palavra)) {
      frequencia[palavra] = (frequencia[palavra] || 0) + 1;
    }
  });

  const topPalavras = Object.entries(frequencia)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  resultado.innerHTML = topPalavras.length
    ? '<strong>Top 10 palavras-chave:</strong><br>' +
      topPalavras.map(([p, f]) => `${p} (${f})`).join('<br>')
    : 'Nenhuma palavra-chave encontrada.';
});