      var P = [
        ["Escolas públicas", "CEI Pica Pau"],
        ["Escolas públicas", "CEI Rei Leão"],
        ["Escolas públicas", "CEI Saci Pererê — Dia da Árvore, set/2023"],
        ["Escolas públicas", "EE Israel Schoba — out/2022"],
        ["Escolas públicas", "EE Maria do Carmo Rucci Von Zuben"],
        ["Escolas públicas", "EE Patriarca — 2021 e 2022"],
        [
          "Escolas públicas",
          "EM Profa. Antonia do Canto e Silva Cordeiro — out/2022",
        ],
        ["Escolas públicas", "Diretoria de Ensino Oeste Campinas"],
        ["Escolas públicas", "Colégio Inovati, Valinhos — set/2023"],
        ["Escolas públicas", "EE Orlando Signorelli, Campinas — out/2023"],
        ["Escolas públicas", "EM Integração"],
        ["Área privada", "Canjaranas 1, 2 e 4"],
        ["Área privada", "Comunidade Canjaranas Santo Antonio"],
        ["Área privada", "Alambique Andretta"],
        ["Área privada", "APAVIVA Campinas — dez/2022"],
        ["Área privada", "Jardim Santa Maria"],
        ["Área privada", "Santa Fé — Jersey e Dimas"],
        ["Área privada", "Plantio Eliane"],
        ["Arborização viária", "Canjaranas 3"],
        ["Arborização viária", "Avenida Independência"],
        ["Arborização viária", "Edeanor Tasca"],
        ["Arborização viária", "Rodovia Vinhedo–Itatiba"],
        ["Arborização viária", "Rua Fernando Costa"],
        ["Arborização viária", "Estrada da Boiada"],
        ["Mata ciliar urbana", "Aquário — berços e plantio das mudas"],
        ["Mata ciliar urbana", "Flex"],
        ["Mata ciliar urbana", "Margem do Rio Pinheiros"],
        ["Mata ciliar urbana", "Rua Montevideo — abr e nov/2022"],
        ["Mata ciliar urbana", "Rua Rancho Fundo — abr/2022"],
        [
          "Mata de topo de morro",
          "Assentamento MST Marielle Vive — vários plantios, incl. Dia da Árvore 2023",
        ],
        ["Mata nativa", "Plantio em área pós-incêndio"],
        ["Área pública", "Diagnóstico Jardim Miriam"],
        ["Produção de mudas", "Rede de Viveiros Caseiros Refloresta"],
        ["Produção de mudas", "Transplante de mudas"],
        ["Educação", "FIC Vinhedo 2022"],
        ["Educação", "Oficina Agroecologia e as Águas — De olho nos rios"],
        ["Educação", "Oficina Festa da Primavera Paturis"],
        ["Educação", "Oficina Mural do Clima — FIC Vinhedo"],
        ["Educação", "Oficina de Bokashi para plantios"],
        ["Educação", "Palestra Caritas Louveira"],
        ["Educação", "Palestra Escoteiros da Capela — set/2023"],
        [
          "Educação",
          "Roda de conversa: conhecer para preservar a APP Jardim Miriam",
        ],
        [
          "Educação",
          "Treinamento Diretoria de Ensino Oeste Campinas — dez/2022",
        ],
        ["Educação", "XI Festival do Japão de Vinhedo"],
      ];
      var cur = "Todos",
        cats = ["Todos"],
        term = "",
        limit = 12;
      P.forEach(function (x) {
        if (cats.indexOf(x[0]) < 0) cats.push(x[0]);
      });
      function draw() {
        var c = document.getElementById("chips");
        c.innerHTML = "";
        cats.forEach(function (k) {
          var n =
            k === "Todos"
              ? P.length
              : P.filter(function (x) {
                  return x[0] === k;
                }).length;
          var b = document.createElement("button");
          b.className = "chip";
          b.type = "button";
          b.textContent = k + " (" + n + ")";
          b.setAttribute("aria-pressed", k === cur);
          b.onclick = function () {
            cur = k;
            limit = 12;
            draw();
          };
          c.appendChild(b);
        });
        var l = document.getElementById("plist");
        l.innerHTML = "";
        var R = P.filter(function (x) {
          return (
            (cur === "Todos" || x[0] === cur) &&
            (x[0] + " " + x[1]).toLowerCase().indexOf(term) > -1
          );
        });
        if (!R.length) {
          var e = document.createElement("li");
          e.textContent = "Nenhum plantio encontrado. Tente outro termo.";
          l.appendChild(e);
        }
        R.slice(0, limit).forEach(function (x) {
          var li = document.createElement("li");
          var s = document.createElement("span");
          s.textContent = x[0];
          li.appendChild(s);
          li.appendChild(document.createTextNode(x[1]));
          l.appendChild(li);
        });
        var wrap = document.getElementById("verMaisWrap");
        wrap.innerHTML = "";
        if (R.length > limit) {
          var restante = R.length - limit;
          var btn = document.createElement("button");
          btn.className = "btn alt";
          btn.type = "button";
          btn.textContent = "Ver mais (" + restante + " restantes)";
          btn.style.marginTop = "1.5rem";
          btn.onclick = function () {
            limit = R.length;
            draw();
          };
          wrap.style.textAlign = "center";
          wrap.appendChild(btn);
        }
      }
      draw();
      document.getElementById("q").addEventListener("input", function (e) {
        term = e.target.value.toLowerCase().trim();
        limit = 12;
        draw();
      });
      document.getElementById("f").addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(e.target);
        var body =
          "Nome: " +
          d.get("nome") +
          "\nInteresse: " +
          d.get("tipo") +
          "\n\n" +
          d.get("msg");
        location.href =
          "mailto:reflorestavinhedo@gmail.com?subject=" +
          encodeURIComponent("Quero participar - " + d.get("tipo")) +
          "&body=" +
          encodeURIComponent(body);
      });

      var rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var tb = document.getElementById("topbar"),
        mb = document.getElementById("menu"),
        tn = document.getElementById("tnav");
      var scrollPending = false;
      function onS() {
        tb.classList.toggle("show", window.scrollY > 360);
        if (!tb.classList.contains("show")) {
          tn.classList.remove("open");
          mb.setAttribute("aria-expanded", "false");
        }
        scrollPending = false;
      }
      window.addEventListener("scroll", function () {
        if (!scrollPending) {
          scrollPending = true;
          requestAnimationFrame(onS);
        }
      }, { passive: true });
      onS();
      mb.addEventListener("click", function () {
        var o = tn.classList.toggle("open");
        mb.setAttribute("aria-expanded", o);
      });
      tn.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          tn.classList.remove("open");
          mb.setAttribute("aria-expanded", "false");
        }
      });
      var links = Array.from(tn.querySelectorAll("a"));
      var secs = links.map(function (a) {
        return document.querySelector(a.getAttribute("href"));
      });
      var pill = document.createElement("span");
      pill.className = "pill";
      tn.insertBefore(pill, tn.firstChild);
      var act = null;
      function mv() {
        if (!act) {
          pill.style.opacity = 0;
          return;
        }
        pill.style.width = act.offsetWidth + "px";
        pill.style.transform = "translateX(" + act.offsetLeft + "px)";
        pill.style.opacity = 1;
      }
      window.addEventListener("resize", mv);
      var so = new IntersectionObserver(
        function (es) {
          es.forEach(function (en) {
            if (en.isIntersecting) {
              var i = secs.indexOf(en.target);
              act = i > -1 ? links[i] : null;
              links.forEach(function (a, j) {
                a.classList.toggle("on", i === j);
              });
              mv();
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      secs.forEach(function (x) {
        if (x) so.observe(x);
      });
      function fmt(n) {
        return n.toLocaleString("pt-BR");
      }
      function count(el) {
        var t = +el.dataset.n;
        if (rm) {
          el.textContent = fmt(t);
          return;
        }
        var t0 = null;
        function f(ts) {
          if (!t0) t0 = ts;
          var k = Math.min((ts - t0) / 1400, 1);
          el.textContent = fmt(Math.round(t * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(f);
        }
        requestAnimationFrame(f);
      }
      var nums = Array.from(document.querySelectorAll("[data-n]"));
      var bar = document.querySelector(".bar");
      if (!rm) {
        bar.classList.add("pre");
      }
      var io = new IntersectionObserver(
        function (es) {
          es.forEach(function (en) {
            if (!en.isIntersecting) return;
            var el = en.target;
            io.unobserve(el);
            if (el.dataset.n) count(el);
            if (el === bar) {
              bar.classList.remove("pre");
              bar.classList.add("in");
            }
            if (el.classList.contains("rv")) el.classList.add("in");
          });
        },
        { threshold: 0.25 },
      );
      nums.forEach(function (n) {
        if (!rm) n.textContent = "0";
        io.observe(n);
      });
      io.observe(bar);
      if (!rm) {
        Array.from(document.querySelectorAll(".card,.nums div"))
          .forEach(function (c, i) {
            c.classList.add("rv");
            c.style.setProperty("--d", i % 4);
            io.observe(c);
          });
      }
      var planted = 0,
        art = document.getElementById("art"),
        ex = document.getElementById("extra");
      var msgs = [
        "Boa! Sua primeira muda está no chão.",
        "Mais uma! O solo agradece.",
        "Já é um bosquinho.",
        "Isso é um mutirão de verdade.",
      ];
      document
        .getElementById("plantBtn")
        .addEventListener("click", function () {
          planted++;
          var x = 15 + Math.random() * 370,
            h = 30 + Math.random() * 80,
            r = 12 + Math.random() * 22;
          var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g.setAttribute("class", "tree");
          g.style.setProperty("--i", 0);
          g.innerHTML =
            '<rect x="' +
            (x - 3) +
            '" y="' +
            (270 - h) +
            '" width="6" height="' +
            h +
            '" fill="#7A5A3A"/><circle cx="' +
            x +
            '" cy="' +
            (270 - h - r * 0.5) +
            '" r="' +
            r +
            '" fill="' +
            ["#3E8E4F", "#56A866", "#6CC17E", "#F2B93B"][
              Math.floor(Math.random() * 4)
            ] +
            '"/>';
          ex.appendChild(g);
          document.getElementById("plantMsg").textContent =
            planted +
            (planted === 1 ? " árvore plantada. " : " árvores plantadas. ") +
            msgs[Math.min(planted - 1, msgs.length - 1)];
        });

      var S = [
        {
          c: "Escolas públicas",
          t: "Plantio educativo nas escolas",
          d: "Alunos plantam florestas de bolso e aprendem sobre a Mata Atlântica. Já são 15 escolas no Educa Refloresta, como a EE Patriarca (2021 e 2022).",
          e: "🏫",
          a: "#2F7A40",
          b: "#14402B",
        },
        {
          c: "Mata de topo de morro",
          t: "Recuperação no Assentamento Marielle Vive",
          d: "Vários plantios ao longo dos anos, incluindo o Dia da Árvore de 2023, para devolver mata aos topos de morro.",
          e: "⛰️",
          a: "#56A866",
          b: "#1c5a37",
        },
        {
          c: "Produção de mudas",
          t: "Rede de Viveiros Caseiros",
          d: "As mudas crescem nas casas dos voluntários e são regadas todos os dias até o dia do plantio.",
          e: "🌱",
          a: "#6CC17E",
          b: "#2F7A40",
        },
        {
          c: "Mata ciliar urbana",
          t: "Margens de rio e córregos",
          d: "Plantios na Rua Montevideo, na Rua Rancho Fundo, no Aquário e na margem do Rio Pinheiros para proteger as águas urbanas.",
          e: "💧",
          a: "#3E8E9F",
          b: "#14402B",
        },
        {
          c: "Educação",
          t: "Oficinas, palestras e rodas de conversa",
          d: "Bokashi para plantios, Mural do Clima, agroecologia e águas, e encontros com escoteiros e escolas da região.",
          e: "♻️",
          a: "#F2B93B",
          b: "#8a6a1b",
        },
      ];
      // Para usar fotos reais: adicione  f:'data:image/jpeg;base64,...'  em cada item acima.
      var tr = document.getElementById("track"),
        dt = document.getElementById("dots"),
        ci = 0,
        timer;
      S.forEach(function (x, i) {
        var d = document.createElement("div");
        d.className = "slide";
        d.setAttribute("role", "group");
        d.setAttribute("aria-label", i + 1 + " de " + S.length);
        var pic = x.f
          ? '<div class="pic" style="background-image:url(' + x.f + ')"></div>'
          : '<div class="pic" style="--c1:' +
            x.a +
            ";--c2:" +
            x.b +
            '" aria-hidden="true">' +
            x.e +
            "</div>";
        d.innerHTML =
          pic +
          '<div class="txt"><span>' +
          x.c +
          "</span><h3>" +
          x.t +
          "</h3><p>" +
          x.d +
          "</p></div>";
        tr.appendChild(d);
        var b = document.createElement("button");
        b.setAttribute("aria-label", "Ir para " + (i + 1));
        b.onclick = function () {
          go(i, true);
        };
        dt.appendChild(b);
      });
      function go(i, user) {
        ci = (i + S.length) % S.length;
        tr.style.transform = "translateX(-" + ci * 100 + "%)";
        [].forEach.call(dt.children, function (b, j) {
          b.setAttribute("aria-current", j === ci);
        });
        if (user) play();
      }
      function play() {
        clearInterval(timer);
        if (!rm)
          timer = setInterval(function () {
            go(ci + 1);
          }, 6500);
      }
      document.getElementById("prev").onclick = function () {
        go(ci - 1, true);
      };
      document.getElementById("next").onclick = function () {
        go(ci + 1, true);
      };
      var car = document.getElementById("car"),
        sx = null;
      car.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") go(ci - 1, true);
        if (e.key === "ArrowRight") go(ci + 1, true);
      });
      car.addEventListener("pointerdown", function (e) {
        sx = e.clientX;
      });
      car.addEventListener("pointerup", function (e) {
        if (sx !== null && Math.abs(e.clientX - sx) > 50)
          go(ci + (e.clientX < sx ? 1 : -1), true);
        sx = null;
      });
      car.addEventListener("mouseenter", function () {
        clearInterval(timer);
      });
      car.addEventListener("mouseleave", play);
      car.addEventListener("focusin", function () {
        clearInterval(timer);
      });
      go(0);
      play();


