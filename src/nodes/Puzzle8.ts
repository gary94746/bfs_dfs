import { NodeA } from "../Node";

export class NodePuzzle8 extends NodeA {
  // properties of this especific node
  currentState: number[] = [];
  zeroPosition: number = 0;
  col: number = 3;

  constructor(initialState: number[], private finalState: number[]) {
    super();
    this.setPuzzle(initialState);
  }

  expandMove(): void {
    this.currentState.forEach((element, index) => {
      if (element === 0)
        this.zeroPosition = index;
    });

    this.moveToR(this.currentState, this.zeroPosition);
    this.moveToL(this.currentState, this.zeroPosition);
    this.moveToUp(this.currentState, this.zeroPosition);
    this.moveToDown(this.currentState, this.zeroPosition);
  }

  moveToR(p: number[], i: number) {
    const canMoveToR = i % this.col < this.col - 1;
    this.changeZeroPosition(p, canMoveToR, i + 1, i);
  }

  moveToL(p: number[], i: number) {
    const canMoveToL = i % this.col > 0;
    this.changeZeroPosition(p, canMoveToL, i - 1, i);
  }

  moveToUp(p: number[], i: number) {
    const canMoveToUp = i - this.col >= 0;
    this.changeZeroPosition(p, canMoveToUp, i - 3, i);
  }

  moveToDown(p: number[], i: number) {
    const canMoveToD = i + this.col < this.currentState.length;
    this.changeZeroPosition(p, canMoveToD, i + 3, i);
  }


  copy(a: any, b: any): void {
    for (let i = 0; i < b.length; i++) a[i] = b[i];
  }

  printNode(): void {
    console.log(this.getName());
  }

  isSame(p: NodeA): boolean {
    let same = true;

    for (let index = 0; index < (p as NodePuzzle8).currentState.length; index++) {
      if (this.currentState[index] != (p as NodePuzzle8).currentState[index]) same = false;
    }
    return same;
  }

  goalState(): boolean {
    return JSON.stringify(this.currentState) === JSON.stringify(this.finalState);
  }

  getName(): string {
    return `
    ${this.currentState[0]} ${this.currentState[1]} ${this.currentState[2]}
    ${this.currentState[3]} ${this.currentState[4]} ${this.currentState[5]}
    ${this.currentState[6]} ${this.currentState[7]} ${this.currentState[8]}
    `;
  }

  getRawName(): string {
    return JSON.stringify(this.currentState);
  }

  setPuzzle(p: number[]) {
    for (let i = 0; i < p.length; i++) this.currentState[i] = p[i];
  }

  changeZeroPosition(currentPuzzle: number[], condition: boolean, step: number, zeroPosition: number) {
    if (condition) {
      const cloneOfCurrent: number[] = [];
      this.copy(cloneOfCurrent, currentPuzzle);

      const temp = cloneOfCurrent[step];
      cloneOfCurrent[step] = cloneOfCurrent[zeroPosition];
      cloneOfCurrent[zeroPosition] = temp;

      const node = new NodePuzzle8(cloneOfCurrent, this.finalState);
      node.parent = this;
      this.children.push(node);
    }
  }
}
