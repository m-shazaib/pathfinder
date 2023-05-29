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

document.addEventListener('DOMContentLoaded', function(event) {
  const cells = document.getElementsByClassName('inside-cell');
  let startCell = new Cell('node-0-0');
  let endCell = new Cell('node-14-32');
  let isLeftMouseDown = false;
  let isMiddleMouseDown = false;

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

  for (let cell of cells) {
    cell.textContent = '';

    // startcell
    cell.addEventListener('click', function(event) {
      startCell.setColor('white');
      const clickedCell = new Cell(cell.id);
      clickedCell.setColor('red');
      startCell.setId(clickedCell.id);
    });

    // endcell
    cell.addEventListener('dblclick', function(event) {
      endCell.setColor('white');
      const clickedCell = new Cell(cell.id);
      clickedCell.setColor('green');
      endCell.setId(clickedCell.id);
    });


    // wallcell
    cell.addEventListener('mouseover', function(event) {
      if (isLeftMouseDown) {
        const hoveredCell = new WallCell(cell.id);
        hoveredCell.setColor('black');
      } else if (isMiddleMouseDown) {
        const hoveredCell = new Cell(cell.id);
        hoveredCell.setColor('white');
      }
    });
  }
});
