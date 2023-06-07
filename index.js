import { Cell, startCell, endCell } from './cell.js';
import createAdjacencyList from './adjacencyList.js';
import { Dijkstra } from './algorithms.js'; // Assuming you have a separate file for the Dijkstra implementation

export let cells = document.getElementsByClassName('inside-cell');
export const walls = [];
let grid = createAdjacencyList(cells, startCell); // Pass the startCell as an argument to createAdjacencyList

document.addEventListener('DOMContentLoaded', function(event) {
  startCell.setColor('red');
  grid[startCell.id].distance = 0;
  endCell.setColor('green');

  let isCtrlDown = false;

  // Keyboard events
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Control') {
      isCtrlDown = true;
    }
  });

  document.addEventListener('keyup', function(event) {
    if (event.key === 'Control') {
      isCtrlDown = false;
    }
  });

  for (let cell of cells) {
    cell.textContent = '';

    // Start cell
    cell.addEventListener('click', function(event) {
      if (isCtrlDown) {
        endCell.setColor('white');
        const clickedCell = new Cell(cell.id);
        clickedCell.setColor('green');
        endCell.setId(clickedCell.id);
      } else {
        startCell.setColor('white');
        grid[startCell.id].distance = Infinity;
        const clickedCell = new Cell(cell.id);
        clickedCell.setColor('red');
        startCell.setId(clickedCell.id);
        grid[startCell.id].distance = 0;
        
      }
    });

    // reset color
    cell.addEventListener('dblclick', function(event) {
      const clickedCell = new Cell(cell.id);
      clickedCell.setColor('white');
    });
  }

  // const visitedNodesInOrder = Dijkstra(grid, cells, startCell, endCell, walls);
  // console.log(visitedNodesInOrder);
  // Call Dijkstra function here
});
