export default function createAdjacencyList(grid) {

    const adjacencyList = {};

    for (let cell of grid) {
        
        let cellId = cell.id;

        const[row,coloumn]=cellId.split('-').slice(1).map(Number);
        
        adjacencyList[cellId] = [];

        const neighbors = [

            `node-${row}-${coloumn-1}`,//left
            `node-${row}-${coloumn+1}`,//right
            `node-${row-1}-${coloumn}`,//top
            `node-${row+1}-${coloumn}`,//bottom    
        ];

        for(let neighbor of neighbors){
            if(document.getElementById(neighbor)){
                adjacencyList[cellId].push(neighbor);
            }
           }

        //    console.log(adjacencyList);
           return adjacencyList;


    }
}
         