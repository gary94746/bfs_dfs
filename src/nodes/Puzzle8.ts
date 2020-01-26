import { NodeA } from "../Node";

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
    const same = this.changeZeroPosition(this.currentState, this.zeroPosition);

    const toRight = same(1, this.canMoveToRight);
    const toLeft = same(-1, this.canMoveToLeft);
    const toDown = same(3, this.canMoveToDown);
    const toUp = same(-3, this.canMoveToUp);

    this.addChilds(toRight, toLeft, toDown, toUp);
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
    return p.getRawName() === this.getRawName();
  }

  goalState(): boolean {
    return JSON.stringify(this.currentState) === JSON.stringify(this.finalState);
  }

  getName(): string {
    return this.currentState.map((value, index) => {
      if (index % 3 == 2)
        return value + "\n";
      else
        return value + " ";
    }).reduce((x, c) => x + c);
  }

  getRawName(): string {
    return JSON.stringify(this.currentState);
  }

  changeZeroPosition(currentPuzzle: number[], zeroPosition: number) {
    return (step: number, condition: boolean, stepSize = zeroPosition + step) => {
      if (condition) {
        const clone = [...currentPuzzle];
        [clone[stepSize], clone[zeroPosition]] = [clone[zeroPosition], clone[stepSize]];
        return clone;
      } else {
        return [];
      }
    }
  }

  getChilds(): NodeA[] {
    return this.children;
  }

  setParent(parent: NodeA): void {
    this.parent = parent;
  }

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
