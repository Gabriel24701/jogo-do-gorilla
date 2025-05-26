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