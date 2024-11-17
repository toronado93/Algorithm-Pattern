class Node {
  name: string;
  neighboard: string[];

  constructor(name: string, neighbours: string[]) {
    this.name = name;
    this.neighboard = neighbours;
  }
}

type TQueue = {
  node: string;
  path: string[];
};

class Graph {
  private graph: { [key: string]: Node };
  processed: string[];
  queue: TQueue[];

  constructor(arrayOfNodes: Node[]) {
    this.graph = {};
    for (let node of arrayOfNodes) {
      this.graph[node.name] = node;
    }
    this.processed = [];
    this.queue = [];
  }

  search(initialPoint: string, finalPoint: string): string | string[] {
    // Initialize the queue with the starting point
    this.queue.push({ node: initialPoint, path: [initialPoint] });

    while (this.queue.length > 0) {
      // Dequeue the first item
      const current = this.queue.shift() as TQueue;

      // Check if we've reached the destination
      if (current.node === finalPoint) {
        return current.path;
      }

      // Mark the current node as processed
      this.processed.push(current.node);

      // Add neighbors to the queue
      for (let neighbour of this.graph[current.node].neighboard) {
        if (!this.processed.includes(neighbour)) {
          this.queue.push({
            node: neighbour,
            path: [...current.path, neighbour],
          });
        }
      }
    }

    // If no path is found
    return "No such destination";
  }

  get _Graph() {
    return this.graph;
  }
}

// Create nodes
const node1 = new Node("TwinPeaks", ["A", "B"]);
const node2 = new Node("A", ["C"]);
const node3 = new Node("B", ["D", "E"]);
const node4 = new Node("D", ["C"]);
const node5 = new Node("E", ["C"]);
const node6 = new Node("C", ["GoldenGate"]);

// Create the graph
const graph = new Graph([node1, node2, node3, node4, node5, node6]);

// Run search
console.log(graph.search("TwinPeaks", "GoldenGate")); // Output: ['TwinPeaks', 'A', 'C']
console.log(graph._Graph);

export {};
