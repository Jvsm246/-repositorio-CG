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

const areaTexto = document.getElementById('inputTexto');
const botao = document.getElementById('btnExtrair');
const resultado = document.getElementById('resultadoTermos');

botao.addEventListener('click', () => {
  const textoOriginal = areaTexto.value.trim();
  resultado.innerHTML = '';

  if (!textoOriginal) {
    resultado.innerHTML = "<span style='color:#999'>Nenhum texto inserido.</span>";
    return;
  }

  const termos = extrairTermosPrincipais(textoOriginal);
  if (termos.length === 0) {
    resultado.innerHTML = "<span>Nenhum termo relevante encontrado.</span>";
    return;
  }

  termos.forEach(palavra => {
    const badge = document.createElement('span');
    badge.textContent = palavra;
    resultado.appendChild(badge);
  });
});

function extrairTermosPrincipais(texto) {
  const palavras = texto.match(/\b\p{L}+\b/gu)?.map(p => p.toLowerCase()) || [];
  const palavrasFiltradas = palavras.filter(p => !palavrasBanidas.has(p) && p.length > 2);
