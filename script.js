document.addEventListener("DOMContentLoaded", () => {

const inputs = document.querySelectorAll("input[type=text], input[type=email], input[type=tel]")

const barra = document.getElementById("barraProgresso")

const listaTec = document.getElementById("listaTecnologias")
const listaExp = document.getElementById("listaExperiencias")
const listaCursos = document.getElementById("listaCursos")
const listaFormacao = document.getElementById("listaFormacao")

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
preview.textContent = input.value
}

/* -------- TECNOLOGIAS -------- */

if(input.id === "inputTecnologias" && listaTec){

listaTec.innerHTML = ""

const tecs = input.value.split(",")

tecs.forEach(t=>{

const li = document.createElement("li")
li.textContent = t.trim()

listaTec.appendChild(li)

})

}

/* -------- CURSOS -------- */

if(input.id === "inputCursos" && listaCursos){

listaCursos.innerHTML = ""

const cursos = input.value.split(",")

cursos.forEach(c=>{

const li = document.createElement("li")
li.textContent = c.trim()

listaCursos.appendChild(li)

})

}

/* -------- FORMAÇÃO -------- */

if(input.id === "inputFormacao" && listaFormacao){

listaFormacao.innerHTML = ""

const formacoes = input.value.split(",")

formacoes.forEach(f=>{

const li = document.createElement("li")
li.textContent = f.trim()

listaFormacao.appendChild(li)

})

}

atualizarProgresso()

})

})

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

if(temaBtn){

temaBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark")

temaBtn.textContent =
document.body.classList.contains("dark") ? "☀️" : "🌙"

})

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

if(baixarPDF){

baixarPDF.addEventListener("click",()=>{

const folha = document.querySelector(".folha")

if(folha){
html2pdf().from(folha).save("curriculo.pdf")
}

})

}

});
