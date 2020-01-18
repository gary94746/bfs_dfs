import { NodeA } from "../Node";
import * as _ from "lodash";

export class NodePuzzle8 extends NodeA {
  readonly col: number = 3;

  zeroPosition: number = 0;
  canMoveToRight: boolean;
  canMoveToLeft: boolean;
  canMoveToDown: boolean;
  canMoveToUp: boolean;

  constructor(private currentState: number[], private finalState: number[]) {
    super();

    this.zeroPosition = this.currentState.findIndex(e => e === 0);

    this.canMoveToRight = this.zeroPosition % this.col < this.col - 1;
    this.canMoveToLeft = this.zeroPosition % this.col > 0;
    this.canMoveToDown = this.zeroPosition + this.col < this.currentState.length;
    this.canMoveToUp = this.zeroPosition - this.col >= 0;
  }

  expandMove(): void {
    const same = this.change(this.currentState, this.zeroPosition);

    const toR = same(1, this.canMoveToRight);
    const toL = same(-1, this.canMoveToLeft);
    const toDown = same(3, this.canMoveToDown);
    const toUp = same(-3, this.canMoveToUp);

    this.addChilds(toR, toL, toDown, toUp);
  }

  addChilds(...potentialChilds: number[][]) {
    potentialChilds.forEach(e => {
      if (e.length > 0) {
        const newChild = new NodePuzzle8(e, this.finalState);
        newChild.parent = this;
        this.children.push(newChild);
      }
    })
  }

  printNode(): void {
    console.log(this.getName());
  }

  isSame(p: NodeA): boolean {
    return JSON.stringify(p) === JSON.stringify(this.currentState);
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

  change(currentPuzzle: number[], zeroPosition: number) {
    return (step: number, condition: boolean, stepSize = zeroPosition + step) => {
      if (condition) {
        const cloneOfCurrent = [...currentPuzzle];
        const temp = cloneOfCurrent[stepSize];
        cloneOfCurrent[stepSize] = cloneOfCurrent[zeroPosition];
        cloneOfCurrent[zeroPosition] = temp;

        return cloneOfCurrent;
      } else {
        return [];
      }
    }
  }
}
