import { NodeA } from "./Node";

export class UninformedSearch {
  increment: IterableIterator<string>;

  constructor(private initialNode: NodeA) {
    this.increment = this.getId();
  }

  /**
   * Id generator to identify nodes
   * */
  *getId(): IterableIterator<string> {
    let id = 1;
    while (true) yield (id++).toString();
  }

  /**
   * If path is found, return the path and the generated nodes in the process
   * Space complexity O(|V|), V is number of vertices
   * Time complexity O(|V| + |E|), V is vertex and E every edge
   * */
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

    // while open list has elements, iterate
    while (openList.length > 0) {
      // takes the first element from openList
      const currentNode = openList[0];
      // push into closed list
      closedList.push(currentNode);
      // remove the first element
      openList.shift();
      // expand the current node to get his childs
      currentNode.expandMove();

      // check if one of the generated childs is the goal state
      const isGoalNode = currentNode.getChilds().find((childNode) => {
        // asign id to child
        childNode.setId(this.increment.next().value);

        // if child is the goal node return true, false otherwise
        if (childNode.goalState()) {
          openList.push(childNode);
          return true;
        } else {
          openList.push(childNode);
          return false;
        }
      });

      // if goal node is found, break while
      if (isGoalNode) {
        // get the path
        path.push(...this.getPath(isGoalNode));
        break;
      }
    }

    return {
      path,
      generatedNodes: [...openList, ...closedList],
    };
  }

  /**
   * Iterative Deepining depth-first search
   * */
  iddfs(
    node: NodeA,
    maxDepth: number
  ): {
    generatedNodes: NodeA[];
    path: NodeA[];
  } {
    const arr: NodeA[] = [];

    for (let depth = 0; depth <= maxDepth; ++depth) {
      const isGoalNode = this.dls(node, maxDepth);

      // push the generated nodes by dls
      arr.push(...isGoalNode.generated);

      // check if the node is the goal node
      if (isGoalNode.value) {
        const goal = isGoalNode.generated[isGoalNode.generated.length - 1];

        return {
          generatedNodes: arr,
          path: this.getPath(goal),
        };
      }
    }

    return {
      generatedNodes: [],
      path: [],
    };
  }

  /**
   *  Depth-limited
   *  @param deph the max deph to find the goal node
   * */
  dls(
    node: NodeA,
    deph: number,
    nodes: NodeA[] = []
  ): {
    value: boolean;
    generated: NodeA[];
  } {
    // set and generate id
    node.setId(this.increment.next().value);
    nodes.push(node);

    // check if the node is the goal node then return
    if (node.goalState()) {
      return {
        value: true,
        generated: nodes,
      };
    }

    // if deph is 0 then return
    if (deph == 0) {
      return {
        value: false,
        generated: nodes,
      };
    }

    // generate the childs for the current node
    node.expandMove();

    // call dls in recursive way to all the generated childs
    for (const nd of node.getChilds()) {
      // if value is true return true
      if (this.dls(nd, deph - 1, nodes).value) {
        return {
          value: true,
          generated: nodes,
        };
      }
    }

    return {
      value: false,
      generated: [],
    };
  }

  /**
   * Returns all the parents for a node
   * */
  getPath(initialNode: NodeA | undefined, path: NodeA[] = []): NodeA[] {
    if (initialNode != undefined) path.push(initialNode);

    if (initialNode) {
      return this.getPath(initialNode?.getParent(), path);
    } else {
      return path.reverse();
    }
  }
}
