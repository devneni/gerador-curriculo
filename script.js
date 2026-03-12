document.addEventListener("DOMContentLoaded", () => {

// select all data-capturing inputs except file and buttons
const inputs = document.querySelectorAll("input:not([type=button]):not([type=file])")

const barra = document.getElementById("barraProgresso")

const listaTec = document.getElementById("listaTecnologias")
const listaExp = document.getElementById("listaExperiencias")
const listaCursos = document.getElementById("listaCursos")
const listaFormacao = document.getElementById("listaFormacao")

// helper to populate a list from comma-separated value
function atualizarLista(valor, listaElem) {
  if (!listaElem) return;
  listaElem.innerHTML = "";
  valor.split(",").forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.trim();
    if (li.textContent) listaElem.appendChild(li);
  });
}


/* ---------------- PROGRESSO ---------------- */

function atualizarProgresso(){

let preenchidos = 0

inputs.forEach(input=>{
if(input.value.trim() !== ""){
preenchidos++
}
})

if(barra){
barra.style.width = (preenchidos / inputs.length) * 100 + "%"
}

}

/* ---------------- PREVIEW ---------------- */

inputs.forEach(input=>{

  const salvo = localStorage.getItem(input.id)

  if(salvo){
    input.value = salvo
  }

  input.addEventListener("input",()=>{

localStorage.setItem(input.id,input.value)

const previewId = input.id.replace("input","preview")
const preview = document.getElementById(previewId)

if(preview){

if(preview.tagName === "A"){

preview.href = input.value

}else{

preview.textContent = input.value

}

}

/* -------- TECNOLOGIAS -------- */
if (input.id === "inputTecnologias") {
  atualizarLista(input.value, listaTec);
}

/* -------- CURSOS -------- */
if (input.id === "inputCursos") {
  atualizarLista(input.value, listaCursos);
}

/* -------- FORMAÇÃO -------- */
if (input.id === "inputFormacao") {
  atualizarLista(input.value, listaFormacao);
}

atualizarProgresso()

})

});

// initialize progress bar based on restored values
atualizarProgresso();

/* ---------------- FOTO ---------------- */

const inputFoto = document.getElementById("inputFoto")
const previewFoto = document.getElementById("previewFoto")

if(inputFoto && previewFoto){

inputFoto.addEventListener("change",()=>{

const file = inputFoto.files[0]

if(file){
previewFoto.src = URL.createObjectURL(file)
}

})

}

/* ---------------- EXPERIÊNCIA ---------------- */

const btnExp = document.getElementById("addExp")
const inputExp = document.getElementById("inputExperiencia")

if(btnExp && inputExp && listaExp){

btnExp.addEventListener("click",()=>{

if(inputExp.value.trim() === "") return

const li = document.createElement("li")
li.textContent = inputExp.value

listaExp.appendChild(li)

inputExp.value = ""

})

}

/* ---------------- TEMA ---------------- */

const temaBtn = document.getElementById("tema")

// restore previously selected theme
if (localStorage.getItem("tema") === "dark") {
  document.body.classList.add("dark");
}

if (temaBtn) {
  temaBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  temaBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    temaBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("tema", isDark ? "dark" : "light");
  });
}


/* ---------------- LIMPAR ---------------- */

const limpar = document.getElementById("limpar")

if(limpar){

limpar.addEventListener("click",()=>{

localStorage.clear()
location.reload()

})

}

/* ---------------- PDF ---------------- */

const baixarPDF = document.getElementById("baixarPDF")

if (baixarPDF) {
  baixarPDF.addEventListener("click", () => {
    // simple validation: require at least name or cargo
    const nome = document.getElementById("previewNome").textContent.trim();
    const cargo = document.getElementById("previewCargo").textContent.trim();
    if (!nome && !cargo) {
      alert("Preencha pelo menos o nome ou cargo antes de baixar o PDF.");
      return;
    }

    const folha = document.querySelector(".folha");

    // make sure any responsive transform is removed
    folha.style.transform = "none";

    // apply a temporary class to hide form controls via CSS
    document.body.classList.add("print-mode");

    const opt = {
      margin: [10, 10, 10, 10], // mm top/right/bottom/left
      filename: "curriculo.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] }
    };

    html2pdf()
      .set(opt)
      .from(folha)
      .save()
      .then(() => {
        document.body.classList.remove("print-mode");
      });
  });
}

});
