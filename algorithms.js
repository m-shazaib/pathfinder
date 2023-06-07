export function Dijkstra(graph,cells,start,end,walls){

    let visitedNodesInOrder = [];
    let unvisitedNodes =[...cells];
    let currentNode = start;

    while(unvisitedNodes.length>0){
        
        let neighbors=graph[currentNode.id].neighbors;

        for(let neighbor of neighbors){
            if(!walls.includes(neighbor)){
                let neighborNode = new Cell(neighbor);
                neighborNode.setColor('yellow');
                visitedNodesInOrder.push(neighborNode);
                console.log(visitedNodesInOrder);
            }
        }
}

}
  