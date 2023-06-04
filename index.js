class Cell {
  constructor(id) {
    this.id = id;
    this.color = 'white';
  }

  setColor(color) {
    this.color = color;
    this.updateStyle();
  }

  setId(id) {
    this.id = id;
  }

  updateStyle() {
    const cellElement = document.getElementById(this.id);
    cellElement.style.backgroundColor = this.color;
    cellElement.style.transition = '.3s';
  }
}

const cells = document.getElementsByClassName('inside-cell');
const unvisitedNodes = [];
const walls = [];

function handleMouseDown(event) {
  if (event.button === 0) {
    isLeftMouseDown = true;
  } else if (event.button === 1) {
    isMiddleMouseDown = true;
  }
}

function handleMouseUp(event) {
  if (event.button === 0) {
    isLeftMouseDown = false;
  } else if (event.button === 1) {
    isMiddleMouseDown = false;
  }
}

function handleKeyDown(event) {
  if (event.key === 'Control') {
    isCtrlDown = true;
  }
}

function handleKeyUp(event) {
  if (event.key === 'Control') {
    isCtrlDown = false;
  }
}

function handleClick(cell) {
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
}

function handleDoubleClick(cell) {
  const clickedCell = new Cell(cell.id);
  clickedCell.setColor('white');
}

function handleMouseOver(cell) {
  if (isLeftMouseDown) {
    const hoveredCell = new WallCell(cell.id);
    walls.push(hoveredCell);
    hoveredCell.setColor('black');
  } else if (isMiddleMouseDown) {
    const hoveredCell = new Cell(cell.id);
    hoveredCell.setColor('white');
    // remove the cell from walls array
    const index = walls.findIndex(walls => walls.id === hoveredCell.id);
    if (index !== -1) {
      walls.splice(index, 1);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let startCell = new Cell('node-0-0');
  let endCell = new Cell('node-14-32');

  startCell.setColor('red');
  endCell.setColor('green');

  for (let cell of cells) {
    cell.textContent = '';
    unvisitedNodes.push(cell.id);

    cell.addEventListener('mousedown', handleMouseDown);
    cell.addEventListener('mouseup', handleMouseUp);
    cell.addEventListener('click', handleClick);
    cell.addEventListener('dblclick', handleDoubleClick);
    cell.addEventListener('mouseover', handleMouseOver);
  }
});

export default Cell;
