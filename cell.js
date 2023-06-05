export class Cell {
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

  export var startCell = new Cell('node-0-0');
  export var endCell = new Cell('node-14-32');