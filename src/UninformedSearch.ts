import { NodeA } from "./Node";

export class UninformedSearch {
  autoID: number = 1;
  constructor() { }

  bfs(
    rootNode: NodeA
  ): {
    path: Array<NodeA>;
    generatedNodes: Array<NodeA>;
  } {
    let path: NodeA[] = [];
    let openList: NodeA[] = [];
    let closedList: NodeA[] = [];

    //
    rootNode.id = this.autoID++;
    openList.push(rootNode);

    while (openList.length > 0) {
      const currentNode = openList[0];
      closedList.push(currentNode);
      openList.shift();

      currentNode.expandMove();

      const potentialNode = currentNode.children.find(childNode => {
        childNode.id = this.autoID++;
        if (childNode.goalState()) {
          return true;
        } else {
          openList.push(childNode);
          return false;
        }
      });

      if (potentialNode) {
        path = this.getPath(potentialNode);
        break;
      }
    }

    return {
      path,
      generatedNodes: [...openList, ...closedList]
    };
  }

  getPath(initialNode: NodeA, path: NodeA[] = []): NodeA[] {
    path.push(initialNode);
    if (initialNode.parent != undefined) {
      return this.getPath(initialNode.parent, path);
    } else {
      return path;
    }
  }

}
