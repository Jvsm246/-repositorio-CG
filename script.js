const palavrasBanidas = new Set([
  "que", "para", "com", "não", "uma", "por", "mais", "dos", "como", "mas",
  "foi", "ele", "das", "tem", "seu", "sua", "ser", "quando", "muito", "está",
  "também", "pelo", "pela", "até", "isso", "ela", "entre", "era", "depois",
  "sem", "mesmo", "aos", "ter", "seus", "quem", "nas", "esse", "eles", "estão",
  "você", "tinha", "foram", "essa", "num", "nem", "suas", "meu", "minha", "têm",
  "numa", "pelos", "elas", "havia", "seja", "qual", "será", "nós", "tenho", "lhe",
  "deles", "essas", "esses", "pelas", "este", "fosse", "dele", "vocês", "vos",
  "lhes", "meus", "minhas", "teu", "tua", "teus", "tuas", "nosso", "nossa",
  "nossos", "nossas", "dela", "delas", "esta", "estes", "estas", "aquele",
  "aquela", "aqueles", "aquelas", "isto", "aquilo", "estou", "estamos", "estive",
  "esteve", "estivemos", "estiveram", "estava", "estávamos", "estavam", "e", "ou",
  "onde", "embora", "apesar", "porque", "enquanto", "contudo", "entretanto",
  "portanto", "além", "antes", "todavia", "inclusive", "diante", "sobre", "quanto",
  "apenas", "desde", "uma vez", "segundo", "junto"
]);

const textarea = document.getElementById('inputTexto');
const botao = document.getElementById('btnExtrair');
const resultado = document.getElementById('resultadoTermos');

botao.addEventListener('click', () => {
  const texto = textarea.value.trim();
  resultado.innerHTML = "";

  if (!texto) {
    resultado.innerHTML = "<span style='color:#94a3b8; font-style: italic;'>Insira um texto para análise.</span>";
    return;
  }

  const termos = extrairTermosPrincipais(texto);
  if (termos.length === 0) {
    resultado.innerHTML = "<span>Nenhum termo relevante encontrado.</span>";
    return;
  }

  termos.forEach((palavra, i) => {
    const span = document.createElement('span');
    span.textContent = palavra;
    span.style.animationDelay = `${i * 0.15}s`;
    resultado.appendChild(span);
  });
});

function extrairTermosPrincipais(texto) {
  const palavras = texto.match(/\b\p{L}+\b/gu)?.map(p => p.toLowerCase()) || [];
  const palavrasFiltradas = palavras.filter(p => !palavrasBanidas.has(p) && p.length > 2);
  const frequencias = palavrasFiltradas.reduce((map, palavra) => {
    map[palavra] = (map[palavra] || 0) + 1;
    return map;
  }, {});
  return Object.entries(frequencias)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
}

