import { NodeA } from "./Node";

export class UninformedSearch {
  constructor() {}

  bfs(
    e: NodeA
  ): {
    path: Array<NodeA>;
    generatedNodes: Array<NodeA>;
  } {
    let path: Array<NodeA> = new Array();
    let open: Array<NodeA> = new Array();
    let closed: Array<NodeA> = new Array();

    open.push(e);
    let goal = false;

    while (open.length > 0 && !goal) {
      let current = open[0];
      closed.push(current);
      open.shift();

      current.expandMove();

      for (let index = 0; index < current.children.length; index++) {
        let currentChild = current.children[index];
        if (currentChild.goalState()) {
          goal = true;
          this.pathTrace(path, currentChild);
        }
        if (
          !this.contains(open, currentChild) &&
          !this.contains(closed, currentChild)
        ) {
          open.push(currentChild);
        }
      }
    }

    return {
      path,
      generatedNodes: [...open, ...closed]
    };
  }

  pathTrace(path: Array<NodeA>, n: NodeA): void {
    let current = n;
    path.push(current);

    while (current.parent != undefined) {
      current = current.parent;
      path.push(current);
    }
  }

  contains(list: Array<NodeA>, n: NodeA): boolean {
    let c = false;
    for (let index = 0; index < list.length; index++) {
      if (list[index].isSame(n)) {
        c = true;
      }
    }

    return c;
  }
}
