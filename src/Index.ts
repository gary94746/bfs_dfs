import { UninformedSearch } from "./UninformedSearch";
import * as fs from "fs";
import { NodePuzzle8 } from "./nodes/Puzzle8";
import { ExportData } from "./ExportData";

let initial: number[] = JSON.parse(
  fs.readFileSync("/home/gary94746/Documents/BFS/input.json", "utf-8")
).arr;

let root = new NodePuzzle8(initial);
let ui = new UninformedSearch();
let { path, generatedNodes } = ui.bfs(root);

if (path.length > 0) {
  // print path
  for (let index = path.length - 1; index > -1; index--) {
    path[index].printNode();
  }

  // "arr": [3, 1, 2, 0, 6, 4, 7, 8, 5]
  const exported = new ExportData([...generatedNodes, path[0]], path);
  exported.toJSON("./out.json");
} else {
  console.log("No solved");
}