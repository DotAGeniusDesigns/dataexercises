class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    // Remove all edges connected to this vertex
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        this.removeEdge(node, vertex);
      }
    }
    // Remove the vertex from the graph
    this.nodes.delete(vertex);
  }

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(vertex) {
      // Base case: if vertex is null or already visited
      if (!vertex || visited.has(vertex)) return;

      // Visit the vertex
      visited.add(vertex);
      result.push(vertex.value);

      // Visit all adjacent vertices
      for (let neighbor of vertex.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }

    dfs(start);
    return result;
  }

  breadthFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = new Set();
    visited.add(start);

    while (queue.length) {
      let vertex = queue.shift();
      result.push(vertex.value);

      for (let neighbor of vertex.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = {Graph, Node}