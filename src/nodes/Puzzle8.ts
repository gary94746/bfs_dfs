import { NodeA } from "../Node";

// Represent puzzle as array
/*
 *  | 0 | 1 | 2|
 *  | 3 | 4 | 5|  -> | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
 *  | 6 | 7 | 8|
 * */

export class NodePuzzle8 extends NodeA {
  readonly col: number = 3;

  zeroPosition: number = 0;
  // avalaible movements in NodePuzzle 8
  canMoveToRight: boolean;
  canMoveToLeft: boolean;
  canMoveToDown: boolean;
  canMoveToUp: boolean;

  constructor(private currentState: number[], private finalState: number[]) {
    super();

    // find 0 index position
    this.zeroPosition = this.currentState.findIndex((e) => e === 0);
    // | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |  => 0 is in index 0 <- example

    this.canMoveToRight = this.zeroPosition % this.col < this.col - 1; // 0 % 3 == 0 is less than 2 (this.col - 1)
    this.canMoveToLeft = this.zeroPosition % this.col > 0; // 0 % 3 = 0 isn't greater than 0, then you can't move cero to left
    this.canMoveToDown =
      this.zeroPosition + this.col < this.currentState.length; // 0 + 3 < 8, then you can move down
    this.canMoveToUp = this.zeroPosition - this.col >= 0; // 0 - 3 = -3 isn't greater than 0, then you can't move cero to up
  }

  /**
   * From the current state generate their childs
   * */
  expandMove(): void {
    const same = this.changeZeroPosition(this.currentState, this.zeroPosition);

    const toRight = same(1, this.canMoveToRight);
    const toLeft = same(-1, this.canMoveToLeft);
    const toDown = same(3, this.canMoveToDown);
    const toUp = same(-3, this.canMoveToUp);

    this.addChilds(toRight, toLeft, toDown, toUp);
  }

  /**
   * Setup valid childs and setup his parent, add to the current child nodes
   * */
  addChilds(...potentialChilds: number[][]) {
    potentialChilds.forEach((child) => {
      if (child.length > 0) {
        const newChild = new NodePuzzle8(child, this.finalState);
        newChild.parent = this;
        this.children.push(newChild);
      }
    });
  }

  /**
   * Print current node
   * */
  printNode(): void {
    console.log(this.getName());
  }

  /**
   * Compare the current node with another node, return true if are the same. false otherwise
   * */
  isSame(p: NodeA): boolean {
    return p.getRawName() === this.getRawName();
  }

  /**
   * return true if the current node has the goal state
   * */
  goalState(): boolean {
    return (
      JSON.stringify(this.currentState) === JSON.stringify(this.finalState)
    );
  }

  /**
   * The way you want the node be printed
   * */
  getName(): string {
    /*
     * 																			  		| 0 | 1 | 2|
     *  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |  -> | 3 | 4 | 5|
     *  																					| 6 | 7 | 8|
     * */
    return this.currentState
      .map((value, index) => {
        if (index % 3 == 2) return value + "\n";
        else return value + " ";
      })
      .reduce((x, c) => x + c);
  }

  /**
   * Stringify the current state
   **/
  getRawName(): string {
    return JSON.stringify(this.currentState);
  }

  /**
   * Clone the current state and change the 0 position
   * */
  changeZeroPosition(currentPuzzle: number[], zeroPosition: number) {
    // if condition then change the 0 position to the stepSize param
    return (
      step: number,
      condition: boolean,
      stepSize = zeroPosition + step
    ) => {
      if (condition) {
        const clone = [...currentPuzzle]; // copy the current state

        // change array position, [a, b] to [b, a]
        [clone[stepSize], clone[zeroPosition]] = [
          clone[zeroPosition],
          clone[stepSize],
        ];

        return clone;
      } else {
        return [];
      }
    };
  }

  /**
   * Returns the childs of the current node
   * */
  getChilds(): NodeA[] {
    return this.children;
  }

  /**
   * Set the parent to current node
   * */
  setParent(parent: NodeA): void {
    this.parent = parent;
  }

  /**
   * Returns the parent or undefined
   * */
  getParent(): NodeA | undefined {
    return this.parent;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }
}
