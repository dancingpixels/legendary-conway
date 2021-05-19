// defining the rows and columns of the grid 24 x 24
const rows = 24;
const  cols = 24;

// game state
let playing = false;


// implementing 2 grids holding different game states
const grid = new Array(rows)
const nextGrid = new Array(rows)

function initializeGrids() {
	for (let i=0; i < rows; i++){
		grid[i] = new Array(cols);
		nextGrid[i] = new Array(rows);
	}
}

function resetGrids() {
	for (let i=0; i < rows; i++) {
		for (let j=0; j < cols; j++){
			grid[i][j] = 0;
			nextGrid[i][j] = 0;
		}
	}
}

// intialize
function initialize() {
	createGrid();
	initializeGrids()
	resetGrids();
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
    let rowcol = this.id.split("_")
    let row = rowcol[0];
    let col = rowcol[1];

	let classes = this.getAttribute("class");
	//  Check to see if the string of attributes contains `live`
	if (classes.indexOf("live") > -1) {
		this.setAttribute("class", "dead");
		grid[row][col] = 0;
	} else {
		this.setAttribute("class", "live");
		grid[row][col] = 1;
	}
}


// Event Handlers
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
	computeNextGen();
}

// Game rules computation

function computeNextGen() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }
}

function applyRules(row, col) {
    var numNeighbors = countNeighbors(row, col);
    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
            nextGrid[row][col] = 0;
        }
    } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = 1;
        }
    }
}

function countNeighbors(row, col) {
	function countNeighbors(row, col) {
	    var count = 0;
	    if (row-1 >= 0) {
	        if (grid[row-1][col] == 1) count++;
	    }
	    if (row-1 >= 0 && col-1 >= 0) {
	        if (grid[row-1][col-1] == 1) count++;
	    }
	    if (row-1 >= 0 && col+1 < cols) {
	        if (grid[row-1][col+1] == 1) count++;
	    }
	    if (col-1 >= 0) {
	        if (grid[row][col-1] == 1) count++;
	    }
	    if (col+1 < cols) {
	        if (grid[row][col+1] == 1) count++;
	    }
	    if (row+1 < rows) {
	        if (grid[row+1][col] == 1) count++;
	    }
	    if (row+1 < rows && col-1 >= 0) {
	        if (grid[row+1][col-1] == 1) count++;
	    }
	    if (row+1 < rows && col+1 < cols) {
	        if (grid[row+1][col+1] == 1) count++;
	    }
	    return count;
	}

}

window.onload = initialize;

