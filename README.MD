# 🌳 Refloresta Vinhedo

**Plantando a mudança.** Site institucional do coletivo Refloresta Vinhedo, criado para apresentar sua missão, princípios e ações de regeneração ambiental, reflorestamento e educação ambiental na região de Vinhedo (SP).

## 📌 Sobre o projeto

O site reúne informações sobre o coletivo e incentiva moradores e organizações a participar das iniciativas ambientais. A experiência foi construída em uma única página, com navegação por seções, identidade visual inspirada na natureza e elementos interativos.

## ✨ Funcionalidades

- **Página inicial** com chamada para participação e texto rotativo animado.
- **Quem somos** com a apresentação do coletivo e seus objetivos.
- **Missão** com foco na restauração ambiental e na proteção das nascentes.
- **Ações** sobre plantio de mudas, educação ambiental, recuperação de nascentes e troca de saberes.
- **Princípios** apresentados em cartões gerados dinamicamente com JavaScript.
- **Indicadores animados** e efeitos de entrada conforme as seções aparecem na tela.
- **Menu responsivo** para navegação em dispositivos móveis.
- **Barra de progresso de leitura** e faixa de mensagens animada.
- **Formulário de contato funcional** com envio real de e-mail via EmailJS, campos de nome, e-mail, assunto e mensagem, estado de carregamento no botão e feedback visual de sucesso ou erro.

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura e conteúdo da página.
- **CSS3** — estilos personalizados, animações e comportamento responsivo.
- **Tailwind CSS** — classes utilitárias carregadas via script externo.
- **JavaScript** — interações, menu móvel, contadores, animações de rolagem, renderização dos princípios e integração com o serviço de e-mail.
- **EmailJS** — serviço client-side para envio de e-mails pelo formulário, sem necessidade de backend.
- **Unsplash** — imagens utilizadas como recursos visuais.

## 📁 Estrutura do projeto

```text
refloresta-vinhedo/
├── index.html            # Estrutura HTML da página
├── style.css             # Estilos personalizados e animações
├── script.js             # Lógica de interação, animações e envio do formulário
├── config.example.js     # Modelo de credenciais do EmailJS
├── config.js             # Credenciais reais (não versionado — veja abaixo)
├── .gitignore            # Exclui config.js e .env do controle de versão
├── assets/
│   ├── plantio_de_mudas.jpg
│   ├── acoes_educativas.jpg
│   └── troca_de_saberes.jpg
├── prints/
│   └── landingpage.png   # Captura de tela da página completa
└── README.MD             # Documentação do projeto
```

## 🚀 Como executar localmente

Não é necessário instalar dependências ou compilar o projeto.

1. Faça o download ou clone este repositório.
2. Copie `config.example.js` para `config.js` e preencha as credenciais do EmailJS (veja a seção abaixo).
3. Abra o arquivo `index.html` em um navegador moderno.

Para trabalhar no código, abra a pasta do projeto no editor de sua preferência, como o Visual Studio Code.

> **Atenção:** o site carrega o Tailwind CSS, o EmailJS e algumas imagens por meio de URLs externas. Para que todos os recursos funcionem corretamente, é necessário ter conexão com a internet.

## 📧 Configuração do formulário de contato (EmailJS)

O formulário utiliza o [EmailJS](https://www.emailjs.com/) para enviar mensagens diretamente para um e-mail, sem necessidade de servidor. Para ativá-lo:

1. Crie uma conta gratuita em [emailjs.com](https://www.emailjs.com/) (plano gratuito: 200 e-mails/mês).
2. Adicione um serviço de e-mail em **Email Services** (Gmail, Outlook etc.) e anote o `Service ID`.
3. Crie um template em **Email Templates** usando as variáveis abaixo e anote o `Template ID`:

   | Variável | Campo do formulário |
   |---|---|
   | `{{from_name}}` | Nome |
   | `{{from_email}}` | E-mail |
   | `{{assunto}}` | Assunto |
   | `{{mensagem}}` | Mensagem |

4. Acesse **Account → API Keys** e copie a **Public Key**.
5. Copie `config.example.js` para `config.js` e preencha os valores reais:

```js
// config.js (não versionado — está no .gitignore)
window.ENV = {
  EMAILJS_PUBLIC_KEY:  "SUA_PUBLIC_KEY",
  EMAILJS_SERVICE_ID:  "SEU_SERVICE_ID",
  EMAILJS_TEMPLATE_ID: "SEU_TEMPLATE_ID",
};
```

> **Nota:** `config.js` está no `.gitignore` e nunca deve ser commitado. O `script.js` lê as credenciais de `window.ENV`, definido por esse arquivo.

### Comportamento do formulário

| Situação | Comportamento |
|---|---|
| Enviando | Botão exibe "Enviando…" e fica desabilitado |
| Sucesso | Mensagem verde de confirmação; campos resetados |
| Erro | Mensagem vermelha com fallback para o e-mail direto |

## 📬 Contato apresentado no site

- **E-mail:** reflorestavinhedo@gmail.com
- **Instagram:** [@reflorestavinhedo](https://instagram.com/reflorestavinhedo)

## ⚠️ Observações importantes

- Antes de publicar o site, confirme os números e as afirmações ambientais apresentados na página para garantir que estejam atualizados e tenham fontes verificáveis.
- A Public Key do EmailJS fica exposta no código client-side. Para uso em produção, configure um domínio autorizado nas configurações da conta EmailJS para evitar uso indevido.

## 🌱 Objetivo

Usar a web para divulgar iniciativas de regeneração ambiental, aproximar a comunidade e facilitar a participação em ações que contribuam para um território mais verde.

---

Feito para apoiar a divulgação da causa ambiental em Vinhedo (SP). 🌿
