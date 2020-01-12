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
      let current = open[0];
      closed.push(current);
      open.shift();

      current.expandMove();

      for (let index = 0; index < current.children.length; index++) {
        let currentChild = current.children[index];
        // asign id
        currentChild.id = this.autoID++;
        //
        if (currentChild.goalState()) {
          goal = true;
          path = this.getPath(currentChild);
        } else {
          open.push(currentChild);
        }
      }
    }

    return {
      path,
      generatedNodes: [...open, ...closed]
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
