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
      if (this.getOnClick() && this.getOnMouseover()) {
        changeCellColor(event);
      }
       


       if (this.getOnDblclick()) {
        resetCellColor(event);
        this.setOnClick(false);
        this.setOnMouseover(false); // Reset onMouseover state
        this.setOnDblclick(false);
      }
    }
  }
  
  function changeCellColor(event) {
    var cell = event.target;
    cell.style.backgroundColor = 'red';
    cell.style.transition = '.1s';
  }
  
  function resetCellColor(event) {
    var cell = event.target;
    cell.style.backgroundColor = 'white';
    cell.style.transition = '.s';
  }

  var myEvent = new eventValues();

  document.addEventListener('DOMContentLoaded', function() {
    var elements = document.getElementsByClassName("inside-cell");
  
    for (let cell of elements) {
      cell.textContent = '';
  
      cell.addEventListener('click', function(event) {
        myEvent.setOnClick(true);
        myEvent.checkEvents(event);
      });
  
      cell.addEventListener('mouseover', function(event) {
        myEvent.setOnMouseover(true);
        myEvent.checkEvents(event);
      });
  
      cell.addEventListener('dblclick', function(event) {
        myEvent.setOnDblclick(true);
        myEvent.checkEvents(event);
      });
    }
  });
  