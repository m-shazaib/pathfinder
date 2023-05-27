class eventValues {
  constructor() {
    this.onClick = false;
    this.onMouseover = false;
    this.onDblclick = false;
  }

  setOnClick(state) {
    this.onClick = state;
  }

  setOnMouseover(state) {
    this.onMouseover = state;
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

  getOnDblclick() {
    return this.onDblclick;
  }

  checkEvents(event) {
    if (this.getOnClick()) {
        
      if (this.getOnMouseover()) {
        changeCellColor(event);
      }
    }

    if (this.getOnDblclick()) {
      resetCellColor(event);
    }

    this.setOnClick(false);
    this.setOnMouseover(false);
    this.setOnDblclick(false);
  }



}

function startPoint() {
  var start = document.getElementById('node-0-0');
  start.style.backgroundColor = 'green';
}

function changeCellColor(event) {
  var cell = event.target;
  cell.style.backgroundColor = 'red';
  cell.style.transition = '.2s';
}

function resetCellColor(event) {
  var cell = event.target;
  cell.style.backgroundColor = 'white';
  cell.style.transition = '.3s';
}

var myEvent = new eventValues();
let start = document.getElementById('node-0-0');
let end = document.getElementById('node-14-32');

start.style.backgroundColor = 'green';
end.style.backgroundColor = 'red';

var cells = document.getElementsByClassName("row");

for (let cell of cells) {
  cell.textContent = '';

  cell.addEventListener('click', function(event) {
    myEvent.setOnClick(true);
    myEvent.checkEvents(event);
  });

  cell.addEventListener('mouseover', function(event) {
    myEvent.setOnMouseover(true);
  });

  cell.addEventListener('mouseout', function(event) {
    myEvent.setOnMouseover(false);
  });

  cell.addEventListener('dblclick', function(event) {
    myEvent.setOnDblclick(true);
    myEvent.checkEvents(event);
  });
}
