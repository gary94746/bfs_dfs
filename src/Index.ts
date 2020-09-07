import { UninformedSearch } from "./UninformedSearch";
import { NodePuzzle8 } from "./nodes/Puzzle8";
import { diagramTemplate } from "./print-data";
import { readFromFile, writeToFile } from "./utils";

// extract initial state and final state from json file
const { initialState, finalState } = readFromFile("input.json");

// setup node, initial state and goal state
const rootNode = new NodePuzzle8(initialState, finalState);

const uSearch = new UninformedSearch(rootNode);

// extract generated nodes and path from bfs search
const { path: pathBFS, generatedNodes: generatedNodesBFS } = uSearch.bfs();
const { path: pathDFS, generatedNodes: generatedNodesDFS } = uSearch.iddfs(
  rootNode,
  10
);

const templateDFS = diagramTemplate(generatedNodesDFS, pathDFS);
const templateBFS = diagramTemplate(generatedNodesBFS, pathBFS);

writeToFile("./dfs", templateDFS);
writeToFile("./bfs", templateBFS);
