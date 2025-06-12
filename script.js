import { palavrasIgnoradas } from './filtroPalavras.js';

const botaoExtrair = document.getElementById('analyze-btn');
const saidaResultados = document.getElementById('results');
const campoTexto = document.getElementById('input-text');

// Função principal que inicia a extração após clique no botão
botaoExtrair.addEventListener('click', () => {
  const textoRecebido = campoTexto.value.trim();
  if (!textoRecebido) {
    saidaResultados.textContent = 'Por favor, insira um texto válido para analisar.';
    return;
  }
  const palavrasChave = extrairTopPalavras(textoRecebido);
  saidaResultados.textContent = palavrasChave.join(', ');
});

/**
 * Extrai as principais palavras do texto, ignorando palavras irrelevantes.
 * @param {string} texto 
 * @returns {string[]} Lista das 10 palavras mais frequentes
 */
function extrairTopPalavras(texto) {
  // Regex que captura palavras considerando letras Unicode (acentos e afins)
  const palavras = texto.match(/\b\p{L}+\b/gu)?.map(p => p.toLowerCase()) || [];

  // Filtra palavras que não estão na lista de ignoradas e possuem mais de 2 letras
  const filtradas = palavras.filter(p => !palavrasIgnoradas.has(p) && p.length > 2);

  // Contabiliza frequência
  const frequencias = contarFrequencia(filtradas);

  // Ordena pela frequência e retorna as 10 mais comuns
  return ordenarPorFrequencia(frequencias).slice(0, 10);
}

/**
 * Conta a frequência de cada palavra na lista.
 * @param {string[]} listaPalavras 
 * @returns {Object} Mapa palavra -> frequência
 */
function contarFrequencia(listaPalavras) {
  return listaPalavras.reduce((acc, palavra) => {
    acc[palavra] = (acc[palavra] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Ordena as palavras pela frequência (maior para menor)
 * @param {Object} mapaFrequencia 
 * @returns {string[]} lista de palavras ordenadas
 */
function ordenarPorFrequencia(mapaFrequencia) {
  return Object.entries(mapaFrequencia)
    .sort(([,a], [,b]) => b - a)
    .map(([palavra]) => palavra);
}
