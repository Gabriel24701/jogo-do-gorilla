let gorilaVida = 100;
let humanos = [];
let humanosVivos = 100;
let defendendo = false;
let jogoIniciado = false;

const gorilaVidaEl = document.getElementById("gorilaVida");
const humanosVivosEl = document.getElementById("humanosVivos");
const humanosEl = document.getElementById("humanos");
const logEl = document.getElementById("log");

function criarHumanos() {
  for (let i = 0; i < 100; i++) {
    humanos.push({ vivo: true });
    const div = document.createElement("div");
    div.className = "humano vivo";
    div.textContent = "👤";
    div.id = `humano-${i}`;
    humanosEl.appendChild(div);
  }
}

function atualizarStatus() {
  gorilaVidaEl.textContent = gorilaVida;
  humanosVivosEl.textContent = humanosVivos;

  if (gorilaVida <= 0) {
    log("❌ O gorila foi derrotado!");
    jogoIniciado = false;
  }
  if (humanosVivos <= 0) {
    log("🏆 O gorila derrotou todos os humanos!");
    jogoIniciado = false;
  }

  const barraEnergia = document.getElementById("barraEnergia");
  barraEnergia.style.width = gorilaVida + "%";

  // Mudar a cor conforme a vida
  if (gorilaVida > 60) {
    barraEnergia.style.backgroundColor = "#4caf50"; // verde
  } else if (gorilaVida > 30) {
    barraEnergia.style.backgroundColor = "#ff9800"; // laranja
  } else {
    barraEnergia.style.backgroundColor = "#f44336"; // vermelho
  }


  salvarEstado();
}

function atacar() {
  if (!jogoIniciado) return;
  let mortos = 0;
  for (let i = 0; i < humanos.length && mortos < 3; i++) {
    if (humanos[i].vivo) {
      humanos[i].vivo = false;
      document.getElementById(`humano-${i}`).className = "humano derrotado";
      humanosVivos--;
      mortos++;
    }
  }
  log(`🦍 Gorila atacou e eliminou ${mortos} humanos.`);
  atualizarStatus();
}

function defender() {
  if (!jogoIniciado) return;
  defendendo = true;
  log("🛡️ Gorila está se defendendo.");
  setTimeout(() => {
    defendendo = false;
  }, 2000);
}

function curar() {
  if (!jogoIniciado) return;
  const cura = Math.floor(Math.random() * 20) + 10;
  gorilaVida = Math.min(100, gorilaVida + cura);
  log(`💚 Gorila se curou em ${cura} de vida.`);
  atualizarStatus();
}

function humanosAtacam() {
  if (!jogoIniciado || gorilaVida <= 0 || humanosVivos <= 0) return;
  const dano = Math.floor(Math.random() * 15) + 5;
  const finalDano = defendendo ? Math.floor(dano / 2) : dano;
  gorilaVida -= finalDano;
  log(`👥 Humanos atacaram e causaram ${finalDano} de dano.`);
  atualizarStatus();
}

function log(mensagem) {
  logEl.innerHTML += `<p>${mensagem}</p>`;
  logEl.scrollTop = logEl.scrollHeight;
}
