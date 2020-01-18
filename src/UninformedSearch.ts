import { NodeA } from "./Node";

export class UninformedSearch {
  autoID: number = 1;

  constructor(private initialNode: NodeA) { }

  bfs(): {
    path: Array<NodeA>;
    generatedNodes: Array<NodeA>;
  } {
    const path: NodeA[] = [];
    const openList: NodeA[] = [];
    const closedList: NodeA[] = [];

    //
    this.initialNode.id = this.autoID++;
    openList.push(this.initialNode);

    while (openList.length > 0) {
      const currentNode = openList[0];
      closedList.push(currentNode);
      openList.shift();

      currentNode.expandMove();

      const potentialNode = currentNode.children.find(childNode => {
        childNode.id = this.autoID++;
        if (childNode.goalState()) {
          openList.push(childNode);
          return true;
        } else {
          openList.push(childNode);
          return false;
        }
      });

      if (potentialNode) {
        path.push(...this.getPath(potentialNode));
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
