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
    let path: Array<NodeA> = new Array();
    let open: Array<NodeA> = new Array();
    let closed: Array<NodeA> = new Array();

    //
    rootNode.id = this.autoID++;
    open.push(rootNode);
    let goal = false;

    while (open.length > 0 && !goal) {
      const current = open[0];
      closed.push(current);
      open.shift();

      current.expandMove();

      if (this.findChildrenNodes(current, open) != undefined) {
        goal = true;
      }
    }

    return {
      path,
      generatedNodes: [...open, ...closed]
    };
  }

  findChildrenNodes(currentNode: NodeA, openList: NodeA[], index = 0) {
    if (index < currentNode.children.length) {
      const currentChild = currentNode.children[index];
      if (currentChild.goalState())
        return currentChild;
      else {
        openList.push(currentChild);
        this.findChildrenNodes(currentNode, openList, index + 1)
      }
    } else {
      return;
    }
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
