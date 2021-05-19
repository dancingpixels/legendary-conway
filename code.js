// defining the rows and columns of the grid 24 x 24
let rows = 24;
let cols = 24;

let playing = false;

// intialize
function initialize() {
	createGrid();
	setUpControlButtons();
}

// board layout
function createGrid() {
	let table = document.createElement("table");

	for (let i=0; i < rows; i++){
		let gridContainer = document.getElementById("gridContainer");
		if(!gridContainer) console.error("div `gridContainer` does not exist");

		let tr = document.createElement("tr");
		for (let j=0; j < cols; j++){
			let cell = document.createElement("td");

			// Set a unique identifier for each cell by using 
			// an intersection of row & colums
			cell.setAttribute("id", i + "_" + j); 
		
			//  set the proper css class
			cell.setAttribute("class", "dead");
			cell.onclick = cellClickHandler;
			tr.appendChild(cell);
		}
		table.appendChild(tr)
	}
	gridContainer.appendChild(table);
}

// click handler
function cellClickHandler () {
	let classes = this.getAttribute("class");
	//  Check to see if the string of attributes contains `live`
	if (classes.indexOf("live") > -1) {
		this.setAttribute("class", "dead");
	} else {
		this.setAttribute("class", "live");
	}
}

////////////////////////////////////
//       Event Handlers           //
////////////////////////////////////

function setUpControlButtons () {
	let start = document.getElementById("start");
	start.onclick = startButtonHandler;

	let clear = document.getElementById("clear");
	clear.onclick = clearButtonHandler;
}

function startButtonHandler() {
	if (playing) {
		console.log("Pause the game.");
		playing = false;
		this.innerHTML = "continue";
	} else {
		console.log("Continue the game.");
		playing = true;
		this.innerHTML = "pause";
		play();
	}
	
}

function clearButtonHandler() {
	console.log("Clear the game: stop playing, clear the grid");
	playing = false;
	let start = document.getElementById("start");
	start.innerHTML = "start";

}


function play () {
	console.log("Play the game.")
}

window.onload = initialize;

