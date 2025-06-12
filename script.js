import { PALAVRAS_IGNORADAS } from './ignoradas.js';

const botao = document.getElementById('detectar');
const resultado = document.getElementById('resultado');

botao.addEventListener('click', () => {
  const texto = document.getElementById('entrada').value;
  const palavras = extrair(texto);
  resultado.textContent = palavras.join(', ');
});

function extrair(texto) {
  const lista = texto.match(/\b\p{L}+\b/gu)?.map(p => p.toLowerCase()) || [];
  const validas = lista.filter(p => !PALAVRAS_IGNORADAS.has(p) && p.length > 2);
  const contagem = contar(validas);
  return ordenar(contagem).slice(0, 10);
}

function contar(palavras) {
  const mapa = {};
  for (const palavra of palavras) {
    mapa[palavra] = (mapa[palavra] || 0) + 1;
  }
  return mapa;
}

function ordenar(mapa) {
  return Object.entries(mapa)
    .sort((a, b) => b[1] - a[1])
    .map(([chave]) => chave);
}
