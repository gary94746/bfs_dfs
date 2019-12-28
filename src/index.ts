import { NodeE } from "./Node";
import { UninformedSearch } from "./UninformedSearch";
import * as fs from "fs";

let initial: number[] = JSON.parse(
  fs.readFileSync("/home/gary94746/Documents/BFS/input.json", "utf-8")
).arr;

// "arr": [3, 1, 2, 0, 6, 4, 7, 8, 5]

let root = new NodeE(initial);
let ui = new UninformedSearch();
let { path, generatedNodes } = ui.bfs(root);

if (path.length > 0) {
  // print path
  for (let index = path.length - 1; index > -1; index--) {
    path[index].printPuzzle();
  }
  // with generated nodes
  const forGraph: { id: string; parent: string; name: string }[] = [];

  generatedNodes.forEach(e => {
    forGraph.push({
      id: JSON.stringify(e.puzzle),
      parent: JSON.stringify(e.parent?.puzzle),
      name: `
         ${e.puzzle[0]} ${e.puzzle[1]} ${e.puzzle[2]}
         ${e.puzzle[3]} ${e.puzzle[4]} ${e.puzzle[5]}
         ${e.puzzle[6]} ${e.puzzle[7]} ${e.puzzle[8]}
      `
    });
  });

  forGraph.push({
    id: JSON.stringify(path[0].puzzle),
    parent: JSON.stringify(path[1].puzzle),
    name: `
         ${path[0].puzzle[0]} ${path[0].puzzle[1]} ${path[0].puzzle[2]}
         ${path[0].puzzle[3]} ${path[0].puzzle[4]} ${path[0].puzzle[5]}
         ${path[0].puzzle[6]} ${path[0].puzzle[7]} ${path[0].puzzle[8]}
      `
  });

  fs.writeFileSync("./out.json", JSON.stringify(forGraph));
} else {
  console.log("No solved");
}
