var table = document.createElement("table");

function createTable() {
  // Clear the existing table rows
  table.innerHTML = '';

  for (let i = 0; i < rows; i++) {
    var tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      var td = document.createElement("td");
      tr.appendChild(td);
      td.id="node-"+i+"-"+j;
      td.
      td.style.border = "4px solid black";
      td.style.width = "5vh";
      td.style.height = "5vh";
      td.style.margin = "0px";
      td.style.padding = "0px";
      td.style.borderSpacing = "0";
    }
    
    table.appendChild(tr);
  }
}

// Initialize rows and cols based on window dimensions
var width = window.innerWidth;
var height = window.innerHeight;
var cols = Math.floor(width / 32);

// Calculate the initial number of rows that fit on the page
var rowHeight = 10; // Height of each row in pixels
var availableHeight = height - 20; // Adjust for margin and padding
var rows = Math.floor(availableHeight /60);

// Call the createTable function
document.addEventListener("DOMContentLoaded", function(event) {
  createTable();
  // Append the table to the document body
  document.body.appendChild(table);

// Event listener for window resize
window.addEventListener("resize", function(event) {
  // Update width and height based on new window dimensions
  width = window.innerWidth;
  height = window.innerHeight;
  cols = Math.floor(width / 32);

  // Calculate the updated number of rows that fit on the page
  var availableHeight = height - 20; // Adjust for margin and padding
  rows = Math.floor((availableHeight/ 40));
  // Update the table
  createTable();
});

});

