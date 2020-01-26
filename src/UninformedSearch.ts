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

    // setup the root id
    this.initialNode.setId(this.increment.next().value);

    openList.push(this.initialNode);

    while (openList.length > 0) {
      const currentNode = openList[0];
      closedList.push(currentNode);
      openList.shift();

      currentNode.expandMove();

      const potentialNode = currentNode.getChilds().find(childNode => {
        childNode.setId(this.increment.next().value);

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

    // setup id for root node
    this.initialNode.setId(this.increment.next().value);
    stack.push(this.initialNode);

    // condition
    while (stack.length > 0) {
      // check current node, pop from the stack
      const currentNode = stack.pop();

      // add to alrLbl []
      if (currentNode) alrLbl.push(currentNode)

      // goal node
      if (currentNode?.goalState()) {
        path.push(...this.getPath(currentNode));
        break;
      }

      // check for the depth
      if (stack.length < deph) {
        // get childrens
        currentNode?.expandMove();

        currentNode?.getChilds().forEach(f => {
          if (!alrLbl.find(a => a.isSame(f))) {
            f.setId(this.increment.next().value);
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

  getPath(initialNode: NodeA | undefined, path: NodeA[] = []): NodeA[] {
    if (initialNode != undefined) path.push(initialNode);

    if (initialNode)
      return this.getPath(initialNode?.getParent(), path);
    else
      return path.reverse();
  }

}
