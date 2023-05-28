class eventValues {
  constructor() {
    this.onClick = false;
    this.onMouseover = false;
    this.onDblclick = false;
    this.onMouseDown = false;
  }

  setOnClick(state) {
    this.onClick = state;
  }

  setOnMouseover(state) {
    this.onMouseover = state;
  }

  setOnMouseDown(state) {
    this.onMouseDown = state;
  }

  setOnDblclick(state) {
    this.onDblclick = state;
  }

  getOnClick() {
    return this.onClick;
  }

  getOnMouseover() {
    return this.onMouseover;
  }

  getOnMouseDown() {
    return this.onMouseDown;
  }

  getOnDblclick() {
    return this.onDblclick;
  }

  eventsCheck(events, s_e) {
    if (events === 'click') {
      if (s_e === 'start') {
        startCellColor(event.target);
        this.setOnClick(false);
      } else if (s_e === 'end') {
        endCellColor(event.target);
        this.setOnDblclick(false);
      }
    } else if (events === 'dblclick') {
      resetCellColor(event.target);
    } else if (events === 'mouseover') {
      walls(event.target);
      this.setOnMouseover(false);
    }
  }
}

function resetCellColor(cell) {
  cell.style.backgroundColor = 'white';
  cell.style.transition = '.3s';
}

function startCellColor(cell) {
  if (cell.id == 'node-0-0') {
    cell.style.backgroundColor = 'green';
  } else {
    cell.style.backgroundColor = 'green';
  }
}

function endCellColor(cell) {
  if (cell.id == 'node-14-32') {
    cell.style.backgroundColor = 'red';
  } else {
    cell.style.backgroundColor = 'red';
  }
}

var myEvent = new eventValues();

// Uncomment and assign the start and end cells appropriately
let start = document.getElementById('node-0-0');
let end = document.getElementById('node-14-32');

document.addEventListener('DOMContentLoaded', function(event) {
  // Uncomment the following lines after assigning the start and end cells
  start.style.backgroundColor = 'green';
  end.style.backgroundColor = 'red';

  var cells = document.getElementsByClassName('inside-cell');

  document.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
      myEvent.setOnMouseDown(true);
    }
  });

  document.addEventListener('mouseup', function(event) {
    if (event.button === 0) {
      myEvent.setOnMouseDown(false);
    }
  });

  for (let cell of cells) {
    cell.textContent = '';

    cell.addEventListener('click', function(event) {
      myEvent.setOnClick(true);
      if (myEvent.getOnClick()) {
        myEvent.eventsCheck('click', 'start');
      } else {
        myEvent.eventsCheck('click', 'end');
      }
    });

    cell.addEventListener('dblclick', function(event) {
      myEvent.setOnDblclick(true);
      myEvent.eventsCheck('dblclick', 'dblclick');
    });

    cell.addEventListener('mouseover', function(event) {
      myEvent.setOnMouseover(true);
      if (myEvent.getOnMouseDown()) {
        cell.style.backgroundColor = 'black';
      }
    });
  }
});
