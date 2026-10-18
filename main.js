const p=[["🍃","Simples","Valorizamos toda ação alinhada aos nossos valores e práticas, por menor que seja."],["🌱","Concretos","Nada como plantar para sentir o gosto da MUDAnça. A pedagogia da ação nos transforma e nos inspira a ser exemplo."],["🔬","Reflexivos","Nossa prática se apoia na ciência e em referências globais, como o Acordo de Paris, o Estatuto da Cidade, a Economia Donut, a Economia Circular e a Biomimética."],["🫶","Inclusivos","Toda ação faz diferença. Valorizamos o que cada pessoa pode oferecer, porque a transformação acontece no dia a dia."],["🌈","Diversos","A diversidade nos fortalece: ideias diferentes geram novas soluções para futuros desejáveis."],["🤲","Pelo bem comum","Somos voluntários e não permitimos o uso do coletivo para benefícios privados, políticos ou econômicos."],["🧭","Independentes","Apoiamos políticas públicas ambientais alinhadas aos nossos princípios, preservando a autonomia de pensar e agir."],["♻️","Regenerativos","Cuidamos dos sistemas naturais e de toda a vida que eles sustentam."]];
document.getElementById('princ').innerHTML=p.map(x=>`<div class="pr"><span class="pr-ico" aria-hidden="true">${x[0]}</span><p class="text-xs uppercase tracking-[.2em] text-gray-400 mb-1">Somos</p><h3 class="text-xl font-extrabold text-lime-400 mb-3">${x[1]}</h3><p class="text-sm text-gray-300 leading-relaxed">${x[2]}</p></div>`).join('');
menuBtn.onclick=()=>{mobile.classList.toggle('hidden');mobile.classList.toggle('flex')};
document.querySelectorAll('#mobile a').forEach(a=>a.onclick=()=>{mobile.classList.add('hidden');mobile.classList.remove('flex')});
const io=new IntersectionObserver(e=>e.forEach(i=>{if(i.isIntersecting){i.target.classList.add('show');
 if(i.target.classList.contains('counter')){let t=+i.target.dataset.to,n=0,s=t/50;const f=setInterval(()=>{n+=s;if(n>=t){n=t;clearInterval(f)}i.target.textContent=(n>=t?'+':'')+Math.floor(n).toLocaleString('pt-BR')},25)}
 io.unobserve(i.target)}}),{threshold:.2});
document.querySelectorAll('.reveal,.counter').forEach(el=>io.observe(el));
form.onsubmit=e=>{e.preventDefault();ok.classList.remove('hidden');form.reset()};

// palavra rotativa
const palavras=['cidade.','floresta.','nascente.','história.','Vinhedo.'];let pi=0;
setInterval(()=>{palavra.classList.add('sai');setTimeout(()=>{pi=(pi+1)%palavras.length;palavra.textContent=palavras[pi];palavra.classList.remove('sai')},800)},3500);
// faixa rolante
const frase=['🌱 Plantando a mudança','💧 Protegendo nascentes','🌳 Mata Atlântica viva','📚 Educação ambiental','🤝 Junte-se a nós'].map(t=>`<span class="mx-8">${t}</span>`).join('');
mq.innerHTML=frase+frase;
// cabeçalho e barra de progresso
const hd=document.querySelector('header');
window.addEventListener('scroll',()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 progresso.style.width=(y/h*100)+'%';hd.classList.toggle('scrolled',y>50)});
// entrada escalonada dos cards e princípios
const pronto=el=>el.addEventListener('transitionend',ev=>{if(ev.propertyName==='opacity'&&el.classList.contains('show')){el.style.transitionDelay='0s';el.classList.add('pronto')}});
document.querySelectorAll('.card').forEach((c,i)=>{c.style.transitionDelay=(i%4)*.12+'s';pronto(c)});

document.querySelectorAll('#princ>div').forEach((d,i)=>{d.classList.add('reveal');d.style.transitionDelay=(i%4)*.12+'s';pronto(d);io.observe(d)});
