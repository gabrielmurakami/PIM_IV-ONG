/* =========================================================
   Refloresta Vinhedo — script.js

   Responsabilidades deste módulo:
     1. Renderização dinâmica dos cards de Princípios (DOM API)
     2. Menu mobile (toggle de visibilidade)
     3. Animações de entrada via IntersectionObserver
     4. Envio do formulário de contato via EmailJS
        (com rate limiting client-side)
     5. Palavra rotativa no Hero
     6. Ticker marquee
     7. Barra de progresso de leitura + comportamento do header
     8. Stagger de entrada dos cards

   Arquivo de credenciais: config.js (excluído do controle de versão)
   Dependências externas: EmailJS v4.4.1 (carregado em index.html)
   ========================================================= */

/* ── 1. Dados dos Princípios ──────────────────────────── */
/*
 * Array estático com os 8 princípios do coletivo.
 * Cada item é uma tupla [ícone, título, descrição].
 * Os dados são inseridos no DOM pela função criarCardPrincipio (seção 2).
 */
const principios = [
  [
    "🍃",
    "Simples",
    "Valorizamos toda ação alinhada aos nossos valores e práticas, por menor que seja.",
  ],
  [
    "🌱",
    "Concretos",
    "Nada como plantar para sentir o gosto da MUDAnça. A pedagogia da ação nos transforma e nos inspira a ser exemplo.",
  ],
  [
    "🔬",
    "Reflexivos",
    "Nossa prática se apoia na ciência e em referências globais, como o Acordo de Paris, o Estatuto da Cidade, a Economia Donut, a Economia Circular e a Biomimética.",
  ],
  [
    "🫶",
    "Inclusivos",
    "Toda ação faz diferença. Valorizamos o que cada pessoa pode oferecer, porque a transformação acontece no dia a dia.",
  ],
  [
    "🌈",
    "Diversos",
    "A diversidade nos fortalece: ideias diferentes geram novas soluções para futuros desejáveis.",
  ],
  [
    "🤲",
    "Pelo bem comum",
    "Somos voluntários e não permitimos o uso do coletivo para benefícios privados, políticos ou econômicos.",
  ],
  [
    "🧭",
    "Independentes",
    "Apoiamos políticas públicas ambientais alinhadas aos nossos princípios, preservando a autonomia de pensar e agir.",
  ],
  [
    "♻️",
    "Regenerativos",
    "Cuidamos dos sistemas naturais e de toda a vida que eles sustentam.",
  ],
];

/* ── 2. Renderização dos cards de Princípios ──────────── */
/*
 * [FIX-SEC-7] Substituído innerHTML por criação via API do DOM.
 *
 * O risco anterior: se a fonte dos dados deixasse de ser um array
 * estático e passasse a vir de uma API ou de input do usuário, a
 * injeção de innerHTML executaria qualquer HTML/script contido no
 * texto — ataque XSS clássico.
 *
 * A correção usa textContent para cada nó de texto, garantindo que
 * o conteúdo seja tratado como texto puro, nunca como marcação.
 */
function criarCardPrincipio(icone, titulo, texto) {
  const div = document.createElement("div");
  div.className = "pr";

  const spanIco = document.createElement("span");
  spanIco.className = "pr-ico";
  spanIco.setAttribute("aria-hidden", "true");
  spanIco.textContent = icone; // textContent — não interpreta HTML

  const pLabel = document.createElement("p");
  pLabel.className = "text-xs uppercase tracking-[.2em] text-gray-400 mb-1";
  pLabel.textContent = "Somos";

  const h3 = document.createElement("h3");
  h3.className = "text-xl font-extrabold text-lime-400 mb-3";
  h3.textContent = titulo; // textContent — não interpreta HTML

  const pTexto = document.createElement("p");
  pTexto.className = "text-sm text-gray-300 leading-relaxed";
  pTexto.textContent = texto; // textContent — não interpreta HTML

  div.append(spanIco, pLabel, h3, pTexto);
  return div;
}

const princEl = document.getElementById("princ");
const fragment = document.createDocumentFragment();

principios.forEach(([icone, titulo, texto]) => {
  fragment.appendChild(criarCardPrincipio(icone, titulo, texto));
});

princEl.appendChild(fragment);

/* ── 3. Menu Mobile ───────────────────────────────────── */
/*
 * Controla a exibição do menu em dispositivos móveis.
 * O botão #menuBtn alterna as classes 'hidden'/'flex' no elemento #mobile.
 * Clicar em qualquer link do menu fecha-o automaticamente.
 */
const menuBtn = document.getElementById("menuBtn");
const mobile = document.getElementById("mobile");

menuBtn.onclick = () => {
  mobile.classList.toggle("hidden");
  mobile.classList.toggle("flex");
};

document.querySelectorAll("#mobile a").forEach((a) => {
  a.onclick = () => {
    mobile.classList.add("hidden");
    mobile.classList.remove("flex");
  };
});

/* ── 4. IntersectionObserver (reveal + counters) ──────── */
/*
 * Observa elementos com as classes .reveal e .counter.
 * Ao entrarem na viewport (threshold 0.2):
 *   - Adiciona a classe .show → dispara a animação CSS de entrada
 *   - Para elementos .counter: executa a animação numérica
 *     (0 → valor final em ~50 passos de 25ms cada)
 * Após a primeira aparição, para de observar o elemento (unobserve).
 */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");

      // Animação dos contadores numéricos
      if (entry.target.classList.contains("counter")) {
        const total = +entry.target.dataset.to;
        let atual = 0;
        const passo = total / 50;

        const ticker = setInterval(() => {
          atual += passo;
          if (atual >= total) {
            atual = total;
            clearInterval(ticker);
          }
          entry.target.textContent =
            (atual >= total ? "+" : "") +
            Math.floor(atual).toLocaleString("pt-BR");
        }, 25);
      }

      io.unobserve(entry.target);
    }),
  { threshold: 0.2 },
);

document.querySelectorAll(".reveal, .counter").forEach((el) => io.observe(el));

/* ── 5. EmailJS — Formulário de contato ───────────────── */
/*
 * As credenciais são lidas de window.ENV, definido em config.js.
 * config.js está no .gitignore e nunca é commitado.
 * Copie config.example.js → config.js e preencha os valores reais.
 *
 * Proteção em runtime: configure os Allowed Origins no painel do
 * EmailJS (Account → Security) com o domínio de produção do site.
 * Essa é a única barreira real contra uso indevido da Public Key,
 * que fica inevitavelmente exposta no código client-side.
 */
const EMAILJS_PUBLIC_KEY = window.ENV?.EMAILJS_PUBLIC_KEY || "";
const EMAILJS_SERVICE_ID = window.ENV?.EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = window.ENV?.EMAILJS_TEMPLATE_ID || "";

if (!EMAILJS_PUBLIC_KEY) {
  console.warn(
    "[EmailJS] config.js não encontrado ou PUBLIC_KEY ausente. " +
      "Copie config.example.js → config.js e preencha os valores.",
  );
}

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form = document.getElementById("form");
const btnEnviar = document.getElementById("btnEnviar");
const ok = document.getElementById("ok");
const erroEl = document.getElementById("erro");

/*
 * [FIX-SEC-8] Rate limiting client-side — limita a 1 envio por minuto.
 *
 * Sem essa proteção, um bot podia esgotar as 200 mensagens/mês do
 * plano gratuito do EmailJS com poucos segundos de requisições.
 * Nota: o rate limiting server-side do EmailJS (Allowed Origins +
 * limites de conta) continua sendo a camada principal de defesa;
 * este controle é complementar e melhora a experiência do usuário.
 */
const INTERVALO_MIN_MS = 60_000; // 60 segundos entre envios
const ERRO_ENVIO_MSG =
  "Ocorreu um erro ao enviar. Tente novamente ou escreva para reflorestavinhedo@gmail.com";

let ultimoEnvioTs = 0;

form.onsubmit = async (e) => {
  e.preventDefault();

  // Limpa estados anteriores
  ok.classList.add("hidden");
  erroEl.classList.add("hidden");

  // Verifica intervalo mínimo entre envios (rate limiting)
  const agora = Date.now();
  if (agora - ultimoEnvioTs < INTERVALO_MIN_MS) {
    const restante = Math.ceil(
      (INTERVALO_MIN_MS - (agora - ultimoEnvioTs)) / 1000,
    );
    erroEl.textContent = `Aguarde ${restante}s antes de tentar novamente.`;
    erroEl.classList.remove("hidden");
    return;
  }

  // Feedback de carregamento
  btnEnviar.textContent = "Enviando…";
  btnEnviar.disabled = true;

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
    ultimoEnvioTs = Date.now(); // Registra timestamp apenas em caso de sucesso
    ok.classList.remove("hidden");
    form.reset();
  } catch (err) {
    console.error("EmailJS error:", err);
    erroEl.textContent = ERRO_ENVIO_MSG;
    erroEl.classList.remove("hidden");
  } finally {
    btnEnviar.textContent = "Enviar";
    btnEnviar.disabled = false;
  }
};

/* ── 6. Palavra rotativa no Hero ──────────────────────── */
/*
 * A cada 3,5s troca a palavra em destaque no título do Hero.
 * Animação: desliza para cima com fade-out (classe .sai via CSS),
 * depois troca o texto e remove .sai para o fade-in.
 * As classes CSS correspondentes estão em style.css (#palavra, #palavra.sai).
 */
const palavras = ["cidade.", "floresta.", "nascente.", "história.", "Vinhedo."];
const palavraEl = document.getElementById("palavra");
let indicePalavra = 0;

setInterval(() => {
  palavraEl.classList.add("sai");
  setTimeout(() => {
    indicePalavra = (indicePalavra + 1) % palavras.length;
    palavraEl.textContent = palavras[indicePalavra];
    palavraEl.classList.remove("sai");
  }, 800);
}, 3500);

/* ── 7. Ticker marquee ────────────────────────────────── */
/*
 * Conteúdo estático controlado — uso de innerHTML é seguro aqui pois
 * os itens são um array de strings literais definidas neste arquivo.
 * O conteúdo é duplicado para garantir loop visual contínuo; a animação
 * CSS (.marquee em style.css) move o container em translateX(-50%).
 */
const itensMarquee = [
  "🌱 Plantando a mudança",
  "💧 Protegendo nascentes",
  "🌳 Mata Atlântica viva",
  "📚 Educação ambiental",
  "🤝 Junte-se a nós",
];

const conteudoMarquee = itensMarquee
  .map((t) => `<span class="mx-8">${t}</span>`)
  .join("");

const mq = document.getElementById("mq");
mq.innerHTML = conteudoMarquee + conteudoMarquee; // duplicado para loop contínuo

/* ── 8. Header + barra de progresso de leitura ─────────── */
/*
 * No evento scroll:
 *   - Atualiza a largura do #progresso proporcionalmente à posição de rolagem
 *   - Adiciona/remove a classe .scrolled no <header> para o sombreado CSS
 */
const header = document.querySelector("header");
const progresso = document.getElementById("progresso");

window.addEventListener("scroll", () => {
  const scrollAtual = window.scrollY;
  const alturaTotal =
    document.documentElement.scrollHeight - window.innerHeight;

  progresso.style.width = (scrollAtual / alturaTotal) * 100 + "%";
  header.classList.toggle("scrolled", scrollAtual > 50);
});

/* ── 9. Stagger de entrada dos cards ─────────────────── */
/*
 * Após a animação de entrada (opacity), o delay é removido
 * para que o hover responda imediatamente (.pronto).
 */
const marcarPronto = (el) => {
  el.addEventListener("transitionend", (ev) => {
    if (ev.propertyName === "opacity" && el.classList.contains("show")) {
      el.style.transitionDelay = "0s";
      el.classList.add("pronto");
    }
  });
};

// Cards de ações
document.querySelectorAll(".card").forEach((card, i) => {
  card.style.transitionDelay = (i % 4) * 0.12 + "s";
  marcarPronto(card);
});

// Cards de princípios (gerados dinamicamente)
document.querySelectorAll("#princ > div").forEach((div, i) => {
  div.classList.add("reveal");
  div.style.transitionDelay = (i % 4) * 0.12 + "s";
  marcarPronto(div);
  io.observe(div);
});
