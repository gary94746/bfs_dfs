import { UninformedSearch } from "./UninformedSearch";
import * as fs from "fs";
import { NodePuzzle8 } from "./nodes/Puzzle8";
import { parseData, ForGraph } from "./ExportData";
import { NodeA } from "./Node";
import * as _ from "lodash";

const readFromFile = (path: string) => {
  return JSON.parse(
    fs.readFileSync(path, "utf-8")
  );
}

const writeToFile = (path: string, data: ForGraph[]) => {
  fs.writeFileSync(path, JSON.stringify(data));
}

const printPath = (path: NodeA[], index = path.length - 1) => {
  if (index > -1) {
    path[index].printNode();
    printPath(path, index - 1);
  } else {
    return;
  }
}

const exportData = (generatedNodes: NodeA[], initialElement: NodeA, path: NodeA[]) => {
  const exported = parseData([...generatedNodes, initialElement], path)
  writeToFile("out.json", exported);
}


const { initialState, finalState } = readFromFile("input.json");
const root = new NodePuzzle8(initialState, finalState);
const ui = new UninformedSearch();
const { path, generatedNodes } = ui.bfs(root);


printPath(path);
exportData(generatedNodes, path[0], path);
