import { Node, Diji } from ".";

// Define nodes according to the graph
const Start = new Node("Start", [
  { name: "A", weight: 5 },
  { name: "B", weight: 2 },
]);

const A = new Node("A", [
  { name: "C", weight: 4 },
  { name: "D", weight: 2 },
]);

const B = new Node("B", [
  { name: "A", weight: 8 },
  { name: "D", weight: 7 },
]);

const C = new Node("C", [
  { name: "Finish", weight: 3 },
  { name: "D", weight: 6 },
]);

const D = new Node("D", [{ name: "Finish", weight: 1 }]);

const Finish = new Node("Finish", []); // Finish node has no outgoing edges

// Create the graph in Diji
const diji = new Diji([Start, A, B, C, D, Finish]);

// Bootstrap to start the algorithm
diji.Main(Start);
console.log(diji.GeneralInfo);
