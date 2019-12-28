import { UninformedSearch } from "./UninformedSearch";
import * as fs from "fs";
import { NodePuzzle8 } from "./nodes/Puzzle8";

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

  // with generated nodes
  const forGraph: {
    id: number;
    parent: number | undefined;
    name: string;
  }[] = [];

  generatedNodes.forEach(e => {
    forGraph.push({
      id: e.id,
      parent: e.parent?.id,
      name: e.getName()
    });
  });

  forGraph.push({
    id: path[0].id,
    parent: path[0].parent?.id,
    name: path[0].getName()
  });

  fs.writeFileSync("./out.json", JSON.stringify(forGraph));
} else {
  console.log("No solved");
}
