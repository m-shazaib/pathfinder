// This file contains the code for creating the adjacency list of the grid. The adjacency list is a data structure that represents the graph of the grid. It is used to get the 
// neighbors of a cell. The neighbors of a cell are the cells that are adjacent to it. 


export default function createAdjacencyList(grid) {

    const adjacencyList = {};  //an  Object that will contain the adjacency list of the grid

    for (let cell of grid) {
        
        let cellId = cell.id;

        const[row,coloumn]=cellId.split('-').slice(1).map(Number);
        
        adjacencyList[cellId] = {neighbors:[],distance:Infinity}; //initializing the adjacency list of the cell for each cell id and setting distance to Infinity

        const neighbors = [             //storing the neighbors of cell in an array

            `node-${row}-${coloumn-1}`,//left
            `node-${row}-${coloumn+1}`,//right
            `node-${row-1}-${coloumn}`,//top
            `node-${row+1}-${coloumn}`,//bottom    
        ];

        for(let neighbor of neighbors){ //making sure the cell is present inside the grid
            if(document.getElementById(neighbor)){
                adjacencyList[cellId].neighbors.push(neighbor);
            }
           }

          


    }

    return adjacencyList;
}
         