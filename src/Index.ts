import * as fs from "fs";

import { UninformedSearch } from "./UninformedSearch";
import { NodePuzzle8 } from "./nodes/Puzzle8";
import { parseData, ForGraph } from "./ExportData";
import { NodeA } from "./Node";

const readFromFile = (path: string) => JSON.parse(fs.readFileSync(path, "utf-8"));

const writeToFile = (path: string, data: ForGraph[]) => fs.writeFileSync(path, JSON.stringify(data));

const printPath = (path: NodeA[]) => path.reverse().forEach(e => e.printNode());

const exportData = (generatedNodes: NodeA[], path: NodeA[]) => {
  const exported = parseData(generatedNodes, path);
  writeToFile("out.json", exported);
}

const { initialState, finalState } = readFromFile("input.json");
const root = new NodePuzzle8(initialState, finalState);
const result = new UninformedSearch(root);
const { path, generatedNodes } = result.bfs();


printPath(path);
exportData(generatedNodes, path);
