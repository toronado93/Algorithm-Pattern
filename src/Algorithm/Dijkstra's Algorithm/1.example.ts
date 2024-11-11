import { Node, Diji } from ".";

// First Example
const Start = new Node("Start", [
  { name: "A", weight: 6 },
  { name: "B", weight: 2 },
]);
const A = new Node("A", [{ name: "Finish", weight: 1 }]);
const B = new Node("B", [
  { name: "A", weight: 3 },
  { name: "Finish", weight: 5 },
]);
const Finish = new Node("Finish", []);

// create graph
const diji = new Diji([Start, A, B, Finish]);
// bootstrap tp algorithm
diji.Main(Start);
console.log(diji.GeneralInfo);
