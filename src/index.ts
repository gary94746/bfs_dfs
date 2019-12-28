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

  // with generated nodes
  const forGraph: { id: string; parent: string; name: string }[] = [];

  generatedNodes.forEach(e => {
    forGraph.push({
      id: e.getRawName(),
      parent: e.getParentRawName(),
      name: e.getName()
    });
  });

  forGraph.push({
    id: path[0].getRawName(),
    parent: path[0].getParentRawName(),
    name: path[0].getName()
  });

  fs.writeFileSync("./out.json", JSON.stringify(forGraph));
} else {
  console.log("No solved");
}
