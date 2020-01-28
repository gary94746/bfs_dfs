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

  iddfs(node: NodeA, maxDepth: number): boolean {
    for (let depth = 0; depth <= maxDepth; ++depth) {
      if (this.dls(node, maxDepth)) {
        return true;
      }
    }

    return false;
  }

  dls(node: NodeA, deph: number): boolean {
    if (node.goalState()) {
      this.getPath(node).forEach(e => e.printNode());
      return true;
    }

    if (deph == 0) return false;

    node.expandMove();

    for (const nd of node.getChilds()) {
      if (this.dls(nd, deph - 1)) {
        return true;
      }
    }

    return false;
  }

  getPath(initialNode: NodeA | undefined, path: NodeA[] = []): NodeA[] {
    if (initialNode != undefined) path.push(initialNode);

    if (initialNode)
      return this.getPath(initialNode?.getParent(), path);
    else
      return path.reverse();
  }

}
