import Cell, { walls, cells } from './index.js';
import createAdjacencyList from './adjacencyList.js';

class WallCell extends Cell {
  constructor(id) {
    super(id);
  }

  setColor(color) {
    if (color === 'black') {
      super.setColor(color);
    } else {
      // Prevent changing the color of wall cells to other colors
      return;
    }
  }
}

let isLeftMouseDown = false;
let isMiddleMouseDown = false;
let nodes=createAdjacencyList(cells);

document.addEventListener('DOMContentLoaded', function() {
  for (let cell of cells) {
    document.addEventListener('mousedown', function(event) {
      if (event.button === 0) {
        isLeftMouseDown = true;
      } else if (event.button === 1) {
        isMiddleMouseDown = true;
      }
    });

    document.addEventListener('mouseup', function(event) {
      if (event.button === 0) {
        isLeftMouseDown = false;
      } else if (event.button === 1) {
        isMiddleMouseDown = false;
      }
    });

    cell.addEventListener('mouseover', function(event) {
      if (isLeftMouseDown) {
        const hoveredCell = new WallCell(cell.id);
        walls.push(hoveredCell);
        hoveredCell.setColor('black');
        // console.log(walls);
      } else if (isMiddleMouseDown) {
        const hoveredCell = new Cell(cell.id);
        hoveredCell.setColor('white');
        // remove the cell from walls array
        const index = walls.findIndex(walls => walls.id === cell.id);
        // the code goes over here,
        if (index !== -1) {
          walls.splice(index, 1);
        }
   
      }
    });
  }

});
