import { IGNORADAS } from './palavrasruins.js';

const botao = document.querySelector('#botao-extrair');
const resultado = document.querySelector('#saida-resultado');

botao.addEventListener('click', () => {
  const textoBruto = document.querySelector('#campo-texto').value;
  const palavras = extrairPalavrasChave(textoBruto);
  resultado.textContent = palavras.join(', ');
});

function extrairPalavrasChave(texto) {
  const lista = texto.match(/\b\p{L}+\b/gu)?.map(p => p.toLowerCase()) || [];
  const validas = lista.filter(p => !IGNORADAS.has(p) && p.length > 2);
  const contagem = contar(validas);
  return ordenar(contagem).slice(0, 10);
}

function contar(lista) {
  const mapa = {};
  for (const termo of lista) {
    mapa[termo] = (mapa[termo] || 0) + 1;
  }
  return mapa;
}

function ordenar(mapa) {
  return Object.entries(mapa)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
}
