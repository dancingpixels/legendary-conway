// defining the rows and columns of the grid 24 x 24
let rows = 24;
let cols = 24;

// intialize
function initialize() {
	createGrid();
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
			tr.appendChild(cell);
		}
		table.appendChild(tr)
	}
	gridContainer.appendChild(table);
}

window.onload = initialize;
