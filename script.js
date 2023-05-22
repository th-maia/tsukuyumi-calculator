// import { boarlords } from './database/boarlords.js'; // estamos com problema de importação tendo que colocar no scrypt do arquivo principal o type="module" porem a função calculate fica sem funcionar.
// https://www.youtube.com/watch?v=6Avdyl8YgWg&ab_channel=HighTechCursosF%C3%A1bricadeProgramador

let total = [0,0,0];

let selectedFaction = boarlords

function changeFaction(faction, factionString) {
	changeImage(factionString);
  console.log(factionString)
  selectedFaction = faction;
  console.log(selectedFaction);
 	changeButtons(faction);
  total = ["---","---","---"];
  writeCalculatedResult()
}

function changeImage(factionString) {
	const image = document.getElementById("factionImage");
	const location = document.createAttribute("src");
	location.value = `./images/${factionString}.png`;

	image.setAttributeNode(location);
}

function changeButtons(faction) {
  const father = document.getElementById("unitsButtons")
  father.innerHTML = "";

  for (let i = 0; i < faction.length; i+=1 ) {
		let selectInput = document.createElement("select");
    selectInput.setAttribute("onchange","calculate()");
    selectInput.setAttribute("style",
      i < faction.length - 1 ? (
        `margin-left: ${faction[i].marginLeft}; transform: translate(-50%); position: absolute;`
      ) : (
        `margin-left: ${faction[i].marginLeft}; transform: translate(-50%);`
      )
    );
    father.appendChild(selectInput);

    for (let e = 0; e <= faction[i].quantity; e+=1 ) {
      let optionNumber = document.createElement("option");
      optionNumber.value = e
      optionNumber.innerHTML = e
      selectInput.appendChild(optionNumber);
    }
	}
}

function calculate() {
	const childrens = document.getElementById("unitsButtons").children
	const numberOfButtons = childrens.length;
	for (let i = 0; i < numberOfButtons; i+=1 ) {
		total[0] += childrens[i].value * selectedFaction[i].conquestValue;
	}

	for (let i = 0; i < numberOfButtons; i+=1 ) {
		total[1] += childrens[i].value * selectedFaction[i].healthPoints;
	}

  for (let i = 0; i < numberOfButtons; i+=1 ) {
		total[2] += childrens[i].value * selectedFaction[i].damageValue;
	}
  writeCalculatedResult()
}

function writeCalculatedResult() {
  const result = document.getElementById("total").children
  for (let i = 0; i < 3; i+=1 ) {
		result[1+i+i].innerText = total[i]
	}
  total = [0,0,0]
}

function saveTotal() {
  const button = document.getElementById(event.target.id)
  const total = document.getElementById("total").innerText;
  button.innerHTML = total
  
}