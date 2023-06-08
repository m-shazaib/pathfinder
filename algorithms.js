export function Dijkstra(graph, cells, start, end, walls) {
    let visitedNodesInOrder = [];
    let unvisitedNodes = [...cells]; // Use the spread operator to create a copy of the cells array
    let distances = {};
    let previous = {};
    
    for(let walNode of walls){
    unvisitedNodes = unvisitedNodes.filter((node) => node.id !== walNode.id);
    }

    console.log(unvisitedNodes);

    // Initialize distances with Infinity for all nodes except the start node
    for (let node of cells) {
      distances[node.id] = node.id === start.id ? 0 : Infinity;
      previous[node.id] = null;
    }
  
    while (unvisitedNodes.length > 0) {
      // Find the node with the minimum distance from the unvisited nodes
      let minDistanceNode = unvisitedNodes.reduce(
        (minNode, node) =>
          distances[node.id] < distances[minNode.id] ? node : minNode
      );
  
      // Remove the minimum distance node from the unvisited nodes list
      unvisitedNodes = unvisitedNodes.filter((node) => node.id !== minDistanceNode.id);
  
      // Stop if the minimum distance node is the end node
      if (minDistanceNode.id === end.id) break;
  
      // Get the neighbors of the minimum distance node from the adjacency list
      let neighbors = graph[minDistanceNode.id].neighbors;
  
      for (let neighbor of neighbors) {
        // Check if the neighbor is a wall
        

        
        if (!walls.includes(neighbor)){
  
        // Calculate the tentative distance from the start node to the neighbor
        let tentativeDistance = distances[minDistanceNode.id] + 1; // Assuming each edge has a weight of 1
  
        // Update the distance and previous node if the tentative distance is shorter
        if (tentativeDistance < distances[neighbor]) {
          distances[neighbor] = tentativeDistance;
          previous[neighbor] = minDistanceNode.id;
        }
    }
      }
    }
  
    // Build the visited nodes in order list by backtracking from the end node
    let currentNode = end.id;
    while (currentNode !== null) {
      visitedNodesInOrder.unshift(currentNode);
      currentNode = previous[currentNode];
    }
  
    return visitedNodesInOrder;
  }