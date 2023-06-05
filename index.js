import  {Cell, startCell, endCell } from './cell.js';

export let cells = document.getElementsByClassName('inside-cell');
export const unvisitedNodes = [];
export const walls= [];

document.addEventListener('DOMContentLoaded', function(event) {

  startCell.setColor('red');
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
    unvisitedNodes.push(cell.id);

    // Start cell
    cell.addEventListener('click', function(event) {
      if (isCtrlDown) {
        endCell.setColor('white');
        const clickedCell = new Cell(cell.id);
        clickedCell.setColor('green');
        endCell.setId(clickedCell.id);
      } else {
        startCell.setColor('white');
        const clickedCell = new Cell(cell.id);
        clickedCell.setColor('red');
        startCell.setId(clickedCell.id);
      }
    });

    // End cell
    cell.addEventListener('dblclick', function(event) {
      const clickedCell = new Cell(cell.id);
      clickedCell.setColor('white');
    });

   
   
  }
});


