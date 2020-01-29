import * as fs from "fs";

import { UninformedSearch } from "./UninformedSearch";
import { NodePuzzle8 } from "./nodes/Puzzle8";
import { parseData, ForGraph } from "./ExportData";
import { NodeA } from "./Node";

const readFromFile = (path: string) => JSON.parse(fs.readFileSync(path, "utf-8"));

const writeToFile = (path: string, data: ForGraph[]) => fs.writeFileSync(path, JSON.stringify(data));

const printPath = (path: NodeA[]) => path.forEach(e => e.printNode());

const exportData = (generatedNodes: NodeA[], path: NodeA[]) => {
  const exported = parseData(generatedNodes, path);
  writeToFile("out.json", exported);
}

const { initialState, finalState } = readFromFile("input.json");
const rootNode = new NodePuzzle8(initialState, finalState);
const uSearch = new UninformedSearch(rootNode);
const { path: pathBFS, generatedNodes: generatedNodesBFS } = uSearch.bfs();
const { path: pathDFS, generatedNodes: generatedNodesDFS } = uSearch.iddfs(rootNode, 10);

