import { Cell } from './cell.js';
import { Wall } from './walls.js';
import { createAdjacencyList } from './adjacencyList.js';
import { DijkstraAlgorithm } from './algorithms.js';

export let cells = document.getElementsByClassName('inside-cell');
export const walls = [];
var startCell = new Cell('node-0-0');
var endCell = new Cell('node-14-32');
var grid = createAdjacencyList(cells, startCell);

document.addEventListener('DOMContentLoaded', function (event) {
  startCell.setColor('#ef233c');
  endCell.setColor('#59d102');

  // Event control variables
  let isCtrlDown = false;
  let isLeftMouseDown = false;
  let   isMiddleMouseDown = false;

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
    cell.textContent = '';

    // Start cell & end cell
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

    // Wall cell
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
        // remove the cell from walls array
        const index = walls.findIndex((wall) => wall.id === cell.id);
        if (index !== -1) {
          walls.splice(index, 1);
        }
      }
    });

    // Reset color
    cell.addEventListener('dblclick', function (  ) {
      const clickedCell = new Cell(cell.id);
      clickedCell.setColor('white');
    });
  }
  
  // Dijkstra's algorithm
function runDijkstra(){
  const dijkstra = new DijkstraAlgorithm(grid, cells, startCell, endCell, walls);
  dijkstra.calculateShortestPath();

  const result = document.getElementById("result"); // Assuming "result" is the ID of the target element
  const pathElement = dijkstra.getPath(); // dijkstra.getPath() returns the path length
  
  result.innerHTML ='The distance to move to the endpoint is '+ pathElement +' cells';
  
}

function resetGrid(){
    for(let cell of cells){
      if(cell.id === startCell.id || cell.id === endCell.id){
        continue;
      }
      const cellElement = document.getElementById(cell.id);
      cellElement.style.backgroundColor = 'white';
      cellElement.style.transition = '.3s';
    }
  }
  
  const dijkstraButton = document.getElementsByTagName('button')[0];
  const resetButton = document.getElementsByTagName('button')[1];
  dijkstraButton.addEventListener('click', runDijkstra);
  resetButton.addEventListener('click',resetGrid);

  
  
  
});