// import { boarlords } from './database/boarlords.js'; // tivemos problema de importação tendo que colocar no scrypt do arquivo principal o type="module" porem a função calculate fica sem funcionar.
// https://www.youtube.com/watch?v=6Avdyl8YgWg&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

let total = [0,0,0];
let saved = [[],[],[],[]]; // novos valores que estou colocando para serem retornados com o modify
let selectedFaction = boarlords;
// usa as funções changeImage, changeButtons, zera os valores de "total" com --- e writeCalculatedResult para colocar na tela.
function changeFaction(faction, factionString) {
	changeImage(factionString);
  console.log(factionString)
  selectedFaction = faction;
  console.log(selectedFaction);
 	changeButtons(faction);
  total = ["---","---","---"];
  writeCalculatedResult()
}

// procura o elemento da classe factionImage que é uma tag <img> e substitui o src
function changeImage(factionString) {
	const image = document.getElementById("factionImage");
	const location = document.createAttribute("src");
	location.value = `./images/${factionString}.png`;

	image.setAttributeNode(location);
}

// pegamos as Div unitsButtons com os Select, apagamos todos os filhos, adicionamos os select baseados 
function changeButtons(faction) {
  const father = document.getElementById("unitsButtons")
  father.innerHTML = ""; //limpa os filhos

  for (let i = 1; i < faction.length; i+=1 ) {
    //cria o <select> e coloca o onChange="calculate()" e o style="margin-left"  
		let selectInput = document.createElement("select");
    selectInput.setAttribute("onchange","calculate()"); //
    selectInput.setAttribute("style",
      i < faction.length - 1 ? (
        `margin-left: ${faction[i].marginLeft}; transform: translate(-50%); position: absolute; height: 30px`
      ) : (
        `margin-left: ${faction[i].marginLeft}; transform: translate(-50%); height: 30px`
      )
    );
    father.appendChild(selectInput);
    // coloca os options nos botões no select de 1 em 1, de 0 ao numero do quantity em cada botão por isso "for em for".
    for (let e = 0; e <= faction[i].quantity; e+=1 ) {
      let optionNumber = document.createElement("option");
      optionNumber.value = e
      optionNumber.innerHTML = e
      selectInput.appendChild(optionNumber);
    }
	}
}

//quando muda o valor de um select no onChange ele faz o calculate() e salva no "total"
function calculate() {
	const childrens = document.getElementById("unitsButtons").children
	const numberOfButtons = childrens.length;
  // childrens é os select na tela, selectedFaction é os dados da facção é i+1, porque o indice 0 é o nome da facção e cores.
	for (let i = 0; i < numberOfButtons; i+=1 ) {
		total[0] += childrens[i].value * selectedFaction[i+1].conquestValue;
	}
	for (let i = 0; i < numberOfButtons; i+=1 ) {
		total[1] += childrens[i].value * selectedFaction[i+1].healthPoints;
	}

  for (let i = 0; i < numberOfButtons; i+=1 ) {
		total[2] += childrens[i].value * selectedFaction[i+1].damageValue;
	}
  writeCalculatedResult()
}

// escreve a variavel total no html
function writeCalculatedResult() {
  const result = document.getElementById("total").children
  for (let i = 0; i < 3; i+=1 ) {
		result[1+i+i].innerText = total[i]
	}
  total = [0,0,0]
}

//salva as unidades no saved quando clica no save.
//o formato do saved é 4 arrays um para cada slot, [0] a facção, [1] até [length-1] a quantidade das unidades
function saveUnits(saveSlot) {
  const childrens = document.getElementById("unitsButtons").children
  const numberOfButtons = childrens.length;
  let toSave = [selectedFaction]
  for (let i = 0; i < numberOfButtons; i+=1 ) {
		toSave.push(childrens[i].value)
	}
  saved[saveSlot] = toSave
  console.log(saved)
}

//salva o total no botão tela.
function saveTotal(saveSlot) {
  const button = document.getElementById(event.target.id);
  button.style.backgroundColor = selectedFaction[0]["backgroundColor"];
  button.style.color = selectedFaction[0]["color"];
  const total = document.getElementById("total").innerText;
  button.innerHTML = total
  enableModify(saveSlot);
  saveUnits(saveSlot);
}

// remove o disabled dos butoes modify 
function enableModify(saveSlot) {
  const modifyButton = document.getElementById(`modify${saveSlot}`)
  modifyButton.removeAttribute("disabled")
}

//da load no saved,
function load(saveSlot) {
  const button = document.getElementById(event.target.id);
  let dataToLoad = saved[saveSlot]
  console.log(dataToLoad)
  changeImage(dataToLoad[0][0].name)
  selectedFaction = saved[saveSlot][0];
  changeButtons(dataToLoad[0])
  putSavedUnits(dataToLoad)
  calculate()
}

// TRABALHANDO AQUI
function putSavedUnits(dataToLoad) {
  const childrens = document.getElementById("unitsButtons").children
  const numberOfButtons = childrens.length;
  console.log(dataToLoad);
  for (let i = 0; i < numberOfButtons; i+=1 ) {
		childrens[i].value = dataToLoad[1+i]
	}
}