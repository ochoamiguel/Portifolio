
//welcome message
function mostrarMensagemBoasVindas() {
  const agora = new Date();
  const hora = agora.getHours();
  const mensagem = document.getElementById('welcome-message');

  let texto = '';

  if (hora < 12) {
      texto = ' Bom dia, visitante!';
    } else if (hora < 18) {
      texto = ' Boa tarde!';
    } else {
      texto = ' Boa noite!';
    }

    mensagem.textContent = texto;

    setTimeout(() => {
      mensagem.style.display = 'none';
    }, 3000);
  };

  mostrarMensagemBoasVindas();

//  smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link =>{
link.addEventListener('click',function(e){
  e.preventDefault();
  const alvo = document.querySelector(this.getAttribute('href'));
if (alvo){
  alvo.scrollIntoView({ 
    behavior: 'smooth'
  });
} 
});
});

//animate background

const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');

let width, height, particles;
const numParticles = 100;

function init() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      color: `rgba(${150 + Math.random() * 100}, ${100 + Math.random() * 100}, 255, 0.8)`,
      speedX: (Math.random() - 0.5) * 0.7,
      speedY: (Math.random() - 0.5) * 0.7
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let p of particles) {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > width) p.speedX *= -1;
    if (p.y < 0 || p.y > height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

//form validation

function mostrarAviso(texto, cor = "#4caf50") {
  aviso.textContent = texto;
  aviso.style.color = cor;
  aviso.classList.add("show");

  setTimeout(() => {
    aviso.classList.remove("show");
  }, 3000);
}

document.getElementById("form-contato").addEventListener("submit", function(event) {

  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;
  const aviso = document.getElementById("aviso");
  const erron = document.getElementById("aviso-nome");
  const erroe = document.getElementById("aviso-email");
  const errom = document.getElementById("aviso-mensagem");

  erron.textContent = "";
  erroe.textContent = "";
  errom.textContent = "";
  aviso.textContent = "";

  if (nome.trim() === ""){
    erron.innerText = "Insira um nome válido!"
    setTimeout(() => (erron.textContent = ""), 3000);
  }

  if (!email.includes("@") || !email.includes(".")) {
    erroe.innerText = "Insira um email válido!";
    setTimeout(() => (erroe.textContent = ""), 3000);
  }

  if (mensagem.trim() === "") {
    errom.innerText = "Digite uma mensagem!";
    setTimeout(() => (errom.textContent = ""), 3000);
  }

else{
 mostrarAviso("Mensagem enviada!");
}

this.reset();

});

//theme button
function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("light");
}

//hamburguer
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

fetch('projetos.json')
  .then(res => res.json())
  .then(projetos => {
    const grid = document.getElementById('projetos-grid');

    projetos.forEach(projeto => {
      grid.innerHTML += `
        <div class="projetos-card">
          <a href="${projeto.link}" target="_blank">
            <div class="projetos-card-image">
              <img src="${projeto.imagem}" alt="Preview do projeto ${projeto.nome}">
            </div>
            <div class="projetos-card-content">
              <h3 class="projetos-card-title">${projeto.nome}</h3>
              <p class="projetos-card-description">${projeto.desc}</p>
            </div>
          </a>
        </div>
      `;
    });
  });

  fetch('habilidades.json')
  .then(res => res.json())
  .then(habilidades => {
    const grid = document.getElementById('skills-grid');

    habilidades.forEach(hab => {
      grid.innerHTML += `
        <div class="skill-card">
          <div class="icon-wrapper ${hab.classe}">
            <!-- ícone mantido via CSS como antes -->
          </div>
          <h3>${hab.nome}</h3>
        </div>
      `;
    });
  });