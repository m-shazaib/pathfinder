import  { Cell } from './cell.js';


export class Wall extends Cell {
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
