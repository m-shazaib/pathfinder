export class DijkstraAlgorithm {
  constructor(graph, cells, start, end, walls) {
    this.graph = graph;
    this.cells = cells;
    this.start = start;
    this.end = end;
    this.walls = walls;
    this.visitedNodesInOrder = [];
    this.distances = {};
    this.previous = {};   //keeps track of previous node visited
    this.condition = false;
  }

  
  initialize() {
    let unvisitedNodes = [...this.cells];   //spread operator to copy array


    //removing walls from unvisited nodes
    for (let wallNode of this.walls) {
      unvisitedNodes = unvisitedNodes.filter((node) => node.id !== wallNode.id); //filtering makes copy of the array and removes the un needed elements
    }

    for (let node of this.cells) {
      this.distances[node.id] = node.id === this.start.id ? 0 : Infinity; //setting distance to Infinity except for start node
      this.previous[node.id] = null;  //setting previous to null
    }

    return unvisitedNodes;
  }

 

 



  minimumDistance(unvisitedNodes) {
    let minDistanceNode = unvisitedNodes.reduce(
      (minNode, node) =>
        this.distances[node.id] < this.distances[minNode.id] ? node : minNode
    );

    return minDistanceNode;
    }

    pathNodes(){
     
      let path = [];
      let current = this.end.id;
      while (current !== this.start.id) {
        path.unshift(current);
        current = this.previous[current];
      }
      path.unshift(this.start);
      return path;

    }
   
    calculateShortestPath() {
      let unvisitedNodes = this.initialize();
    
      while (unvisitedNodes.length > 0) {
        let minDistanceNode = this.minimumDistance(unvisitedNodes);
    
        unvisitedNodes = unvisitedNodes.filter((node) => node.id !== minDistanceNode.id);
    
        if (minDistanceNode.id === this.end.id) break;
    
        let neighbors = this.graph[minDistanceNode.id].neighbors;
    
        for (let neighbor of neighbors) {
          let tentativeDistance = this.distances[minDistanceNode.id] + 1;
    
          if (tentativeDistance < this.distances[neighbor]) {
            this.distances[neighbor] = tentativeDistance;
            this.previous[neighbor] = minDistanceNode.id;
            this.visitedNodesInOrder.push(minDistanceNode.id);
          }
        }
      }
    
      let visits = this.visitedNodesInOrder;
      console.log('hey ' + visits);
      this.pathColoring(visits, 'rgb(0, 255, 0)', 50, '.3s', () => {
        // This callback function is executed after visited node coloring is completed
        let path = this.pathNodes();
        this.pathColoring(path, 'rgb(0, 0, 255)', 200, '.6s');
      });
    }
    
    pathColoring(nodes, color, delay, time, callback) {
      // Delay in milliseconds between each coloring operation
      for (let i = 0; i < nodes.length; i++) {
        setTimeout(() => {
          if (nodes[i] !== this.start.id && nodes[i] !== this.end.id)
            document.getElementById(nodes[i]).style.backgroundColor = color;
          document.getElementById(nodes[i]).style.transition = time;
    
          if (i === nodes.length -1 && callback) {
            // Execute the callback function after the last coloring operation
            setTimeout(callback, delay);
          }
        }, delay * i);
      }
    }
    


}




