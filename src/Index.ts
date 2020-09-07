import * as fs from "fs";

import { UninformedSearch } from "./UninformedSearch";
import { NodePuzzle8 } from "./nodes/Puzzle8";
import { NodeA } from "./Node";
import { diagramTemplate } from "./print-data";

// read from file the input, root and goal nodes
const readFromFile = (path: string) =>
  JSON.parse(fs.readFileSync(path, "utf-8"));

// function to printh path in console
const printPath = (path: NodeA[]) => path.forEach((e) => e.printNode());

// extract initial state and final state from json file
const { initialState, finalState } = readFromFile("input.json");

// setup node, initial state and goal state
const rootNode = new NodePuzzle8(initialState, finalState);

const uSearch = new UninformedSearch(rootNode);

// extract generated nodes and path from bfs search
//const { path: pathBFS, generatedNodes: generatedNodesBFS } = uSearch.bfs();
const { path: pathDFS, generatedNodes: generatedNodesDFS } = uSearch.iddfs(
  rootNode,
  10
);

const toWrite = diagramTemplate(generatedNodesDFS, pathDFS);
