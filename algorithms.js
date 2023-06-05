export function Dijkstra(grid, startCell, endCell) {
const visitedNodesInOrder = [];

visitedNodesInOrder.push(startCell);
    
startCell.distance=0;

for(let node of grid){
    
    node.distance=0;
    node.previous=null;
}


}