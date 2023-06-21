import { Cell } from './cell.js';
import { Wall } from './walls.js';
import { createAdjacencyList } from './adjacencyList.js';
import { DijkstraAlgorithm } from './algorithms.js';

// Existing code...

document.addEventListener('DOMContentLoaded', function (event) {
  var table = document.createElement("table");
  var rows = 15; // Update with the number of rows in your table
  var cols = 33; // Update with the number of columns in your table

  // Create the table and append it to the document body
  for (let i = 0; i < rows; i++) {
    var tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      var td = document.createElement("td");
      tr.appendChild(td);
      td.id = "node-" + i + "-" + j;
      td.className = "inside-cell";
      td.style.border = "4px solid black";
      td.style.width = "5vh";
      td.style.height = "5vh";
      td.style.margin = "0px";
      td.style.padding = "0px";
      td.style.borderSpacing = "0";
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);

  // Get the cells and walls
  let cells = document.getElementsByClassName('inside-cell');
  const walls = [];
  var startCell = new Cell('node-0-0');
  var endCell = new Cell('node-14-32');

  // Create the adjacency list
  var grid = createAdjacencyList(cells, startCell);

  // Start and end cell colors
  startCell.setColor('#ef233c');
  endCell.setColor('#59d102');

  // Event control variables
  let isCtrlDown = false;
  let isLeftMouseDown = false;
  let isMiddleMouseDown = false;

  // Keyboard events
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Control') {
      isCtrlDown = true;
    }
  });

  document.addEventListener('keyup', function (event) {
    if (event.key === 'Control') {
      isCtrlDown = false;
    }
  });

  for (let cell of cells) {
    // Click event for start cell & end cell
    cell.addEventListener('click', function (event) {
      if (isCtrlDown) {
        endCell.setColor('white');
        const clickedCell = new Cell(cell.id);
        clickedCell.setColor('#59d102');
        endCell.setId(clickedCell.id);
      } else {
        startCell.setColor('white');

        const clickedCell = new Cell(cell.id);
        clickedCell.setColor('#ef233c');
        startCell.setId(clickedCell.id);
      }
    });

    // Mouse events for wall cell
    document.addEventListener('mousedown', function (event) {
      if (event.button === 0) {
        isLeftMouseDown = true;
      } else if (event.button === 1) {
        isMiddleMouseDown = true;
      }
    });

    document.addEventListener('mouseup', function (event) {
      if (event.button === 0) {
        isLeftMouseDown = false;
      } else if (event.button === 1) {
        isMiddleMouseDown = false;
      }
    });

    cell.addEventListener('mouseover', function (event) {
      if (isLeftMouseDown) {
        const hoveredCell = new Wall(cell.id);
        walls.push(hoveredCell);
        hoveredCell.setColor('black');
      } else if (isMiddleMouseDown) {
        const hoveredCell = new Cell(cell.id);
        hoveredCell.setColor('white');
        // Remove the cell from the walls array
        const index = walls.findIndex((wall) => wall.id === cell.id);
        if (index !== -1) {
          walls.splice(index, 1);
        }
      }
    });

    // Reset color
    cell.addEventListener('dblclick', function () {
      const clickedCell = new Cell(cell.id);
      clickedCell.setColor('white');
    });
  }

  // Dijkstra's algorithm
  function runDijkstra() {
    const dijkstra = new DijkstraAlgorithm(grid, cells, startCell, endCell, walls);
    dijkstra.calculateShortestPath();

    const result = document.getElementById("result"); // Assuming "result" is the ID of the target element
    const pathElement = dijkstra.getPath(); // dijkstra.getPath() returns the path length

    result.innerHTML = 'The distance to move to the endpoint is ' + pathElement + ' cells';
  }

  function resetGrid() {
    for (let cell of cells) {
      if (cell.id === startCell.id || cell.id === endCell.id) {
        continue;
      }
      const cellElement = document.getElementById(cell.id);
      cellElement.style.backgroundColor = 'white';
      cellElement.style.transition = '.3s';
    }
    walls.length = 0;
  }

  const dijkstraButton = document.getElementsByTagName('button')[0];
  const resetButton = document.getElementsByTagName('button')[1];
  dijkstraButton.addEventListener('click', runDijkstra);
  resetButton.addEventListener('click', resetGrid);
});
