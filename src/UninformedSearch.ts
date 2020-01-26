import { NodeA } from "./Node";

export class UninformedSearch {
  increment: IterableIterator<number>;

  constructor(private initialNode: NodeA) {
    this.increment = this.getId();
  }

  * getId(): IterableIterator<number> {
    let id = 1;
    while (true)
      yield id++;
  }

  bfs(): {
    path: Array<NodeA>;
    generatedNodes: Array<NodeA>;
  } {
    const path: NodeA[] = [];
    const openList: NodeA[] = [];
    const closedList: NodeA[] = [];

    //
    this.initialNode.id = this.increment.next().value;

    openList.push(this.initialNode);

    while (openList.length > 0) {
      const currentNode = openList[0];
      closedList.push(currentNode);
      openList.shift();

      currentNode.expandMove();

      const potentialNode = currentNode.children.find(childNode => {
        childNode.id = this.increment.next().value;
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

  dfs(deph: number = 5) {
    const stack: NodeA[] = [];
    const alrLbl: NodeA[] = [];
    const path: NodeA[] = [];

    this.initialNode.id = this.increment.next().value;
    stack.push(this.initialNode);


    while (stack.length > 0) {
      const currentNode = stack.pop();

      if (currentNode) alrLbl.push(currentNode)

      if (currentNode?.goalState()) {
        path.push(...this.getPath(currentNode));
        break;
      }

      if (stack.length < deph) {
        currentNode?.expandMove();
        currentNode?.children.forEach(f => {
          if (!alrLbl.find(a => a.isSame(f))) {
            f.id = this.increment.next().value;
            stack.push(f);
          }
        });
      }

    }

    return {
      generatedNodes: [...alrLbl, ...stack],
      path: path
    }
  }

  getPath(initialNode: NodeA, path: NodeA[] = []): NodeA[] {
    path.push(initialNode);
    if (initialNode.parent != undefined) {
      return this.getPath(initialNode.parent, path);
    } else {
      return path.reverse();
    }
  }

}
