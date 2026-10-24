/* =========================================================
   Refloresta Vinhedo — script.js
   ========================================================= */

/* ── 1. Dados dos Princípios ──────────────────────────── */
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
document.getElementById("princ").innerHTML = principios
  .map(
    ([icone, titulo, texto]) =>
      `<div class="pr">
        <span class="pr-ico" aria-hidden="true">${icone}</span>
        <p class="text-xs uppercase tracking-[.2em] text-gray-400 mb-1">Somos</p>
        <h3 class="text-xl font-extrabold text-lime-400 mb-3">${titulo}</h3>
        <p class="text-sm text-gray-300 leading-relaxed">${texto}</p>
      </div>`,
  )
  .join("");

/* ── 3. Menu Mobile ───────────────────────────────────── */
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
 * Como configurar:
 * 1. Crie conta gratuita em https://www.emailjs.com/
 * 2. Adicione um serviço de e-mail (Gmail, Outlook etc.)
 * 3. Crie um template com as variáveis:
 *      {{from_name}}, {{from_email}}, {{assunto}}, {{mensagem}}
 * 4. Substitua as três constantes abaixo pelos seus IDs
 */
const EMAILJS_PUBLIC_KEY = "SUA_PUBLIC_KEY"; // Account → API Keys
const EMAILJS_SERVICE_ID = "SEU_SERVICE_ID"; // Email Services → Service ID
const EMAILJS_TEMPLATE_ID = "SEU_TEMPLATE_ID"; // Email Templates → Template ID

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form = document.getElementById("form");
const btnEnviar = document.getElementById("btnEnviar");
const ok = document.getElementById("ok");
const erroEl = document.getElementById("erro");

form.onsubmit = async (e) => {
  e.preventDefault();

  // Limpa estados anteriores
  ok.classList.add("hidden");
  erroEl.classList.add("hidden");

  // Feedback de carregamento
  btnEnviar.textContent = "Enviando…";
  btnEnviar.disabled = true;

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
    ok.classList.remove("hidden");
    form.reset();
  } catch (err) {
    console.error("EmailJS error:", err);
    erroEl.classList.remove("hidden");
  } finally {
    btnEnviar.textContent = "Enviar";
    btnEnviar.disabled = false;
  }
};

/* ── 6. Palavra rotativa no Hero ──────────────────────── */
const palavras = ["cidade.", "floresta.", "nascente.", "história.", "Vinhedo."];
const palavraEl = document.getElementById("palavra");
let indicePalavra = 0;

setInterval(() => {
  palavraEl.classList.add("sai");
  setTimeout(() => {
    indicePalavra = (indicePalavra + 1) % palavras.length;
    palavraEl.textContent = palavras[indicePalavra];
    palavraEl.classList.remove("sai");
  }, 600);
}, 3000);

/* ── 7. Ticker marquee ────────────────────────────────── */
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
