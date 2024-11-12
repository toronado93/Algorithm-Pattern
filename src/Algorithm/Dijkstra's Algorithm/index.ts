class Node {
  readonly name: string;
  readonly neighbours: { [key: string]: number };

  constructor(name: string, neighbours: { name: string; weight: number }[]) {
    this.name = name;
    this.neighbours = {};

    for (const neighbour of neighbours) {
      this.neighbours[neighbour.name] = neighbour.weight;
    }
  }
}

class Diji {
  _Graph: Node[];
  Cost: { [key: string]: number };
  Parent: { [key: string]: string };
  Processed: Node[] = [];
  constructor(arrayofNodes: Node[]) {
    // creation of graph
    this._Graph = arrayofNodes;
    this.Cost = {};
    this.Parent = {};
    // creation of indefinit cost and parent group
    for (let eachNode of arrayofNodes) {
      this.Cost[eachNode.name] = Infinity;
      this.Parent[eachNode.name] = "";
    }
  }

  get GeneralInfo() {
    return {
      graph: this._Graph,
      parent: this.Parent,
      cost: this.Cost,
      processed: this.Processed,
    };
  }

  Find_Lowest_Cost_Node() {
    let lowestNode: undefined | Node = undefined;
    let lowestCost: number = Infinity;

    for (const nodeName in this.Cost) {
      const currentCost = this.Cost[nodeName];

      if (
        currentCost < lowestCost &&
        !this.Processed.some((node) => node.name === nodeName)
      ) {
        lowestCost = currentCost;
        lowestNode = this._Graph.find((eachNode) => eachNode.name === nodeName);
      }
    }
    return typeof lowestNode === "undefined" ? null : lowestNode;
  }

  Main(startNode: Node) {
    let currentNode: null | Node = null;
    // assign zero to beginning node
    this.Cost[startNode.name] = 0;
    // then find the lowest cost node
    // asign to current and start loop through
    currentNode = this.Find_Lowest_Cost_Node();

    while (currentNode) {
      // while looping the current find its neighbour with inner for loop and update their cost if newly founded cost lower than their existing cost
      for (const neighbourName in currentNode.neighbours) {
        // find from dictionary
        const neigbourweight = currentNode.neighbours[neighbourName];
        const existingCost = this.Cost[neighbourName];
        const newCostForNeighbour =
          this.Cost[currentNode.name] + neigbourweight;

        if (newCostForNeighbour < existingCost) {
          // update the cost and parent info
          this.Cost[neighbourName] = newCostForNeighbour;
          this.Parent[neighbourName] = currentNode.name;
        }
      }
      // after for loop end mark the current as processed and call find the lowest cost function and update the current loop through again
      this.Processed.push(currentNode);
      currentNode = this.Find_Lowest_Cost_Node();
    }
    // showing the path
    this.ShowTheWay();
  }

  ShowTheWay() {
    // inside the graph find the neigbourless node
    const lastNode = this._Graph.find((node) => {
      const neigbour = Object.keys(node.neighbours);
      if (neigbour.length === 0) {
        return node.name;
      }
    });

    const orderArray: string[] = [];
    let finalResult = "";
    const resultArray = [];
    let arrow = "-->";

    const recursiveHelper = (lastNode: string) => {
      if (lastNode === "") return;
      const currentNodeName = lastNode;
      orderArray.push(currentNodeName);

      const parentOfCurrentNodeName = this.Parent[currentNodeName];
      if (parentOfCurrentNodeName !== "") {
        recursiveHelper(parentOfCurrentNodeName);
      } else {
        return;
      }
    };
    recursiveHelper(lastNode?.name || "");
    for (let eachNode of orderArray) {
      resultArray.push(eachNode);
      resultArray.push(arrow);
    }
    finalResult = resultArray.join(" ");
    console.log(finalResult);
  }
}

export { Node, Diji };
