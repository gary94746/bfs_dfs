import { NodeA } from "../Node";

export class NodePuzzle8 extends NodeA {
  // properties of this especific node
  puzzle: number[] = [];
  x: number = 0;
  col: number = 3;

  constructor(puzzle: number[]) {
    super();
    this.setPuzzle(puzzle);
  }

  expandMove(): void {
    for (let i = 0; i < this.puzzle.length; i++) {
      if (this.puzzle[i] == 0) {
        this.x = i;
      }
    }

    this.moveToR(this.puzzle, this.x);
    this.moveToL(this.puzzle, this.x);
    this.moveToUp(this.puzzle, this.x);
    this.moveToDown(this.puzzle, this.x);
  }

  copy(a: any, b: any): void {
    for (let i = 0; i < b.length; i++) a[i] = b[i];
  }

  printNode(): void {
    console.log(this.getName());
  }

  isSame(p: NodeA): boolean {
    let same = true;

    for (let index = 0; index < (p as NodePuzzle8).puzzle.length; index++) {
      if (this.puzzle[index] != (p as NodePuzzle8).puzzle[index]) same = false;
    }
    return same;
  }

  goalState(): boolean {
    let isGoal = true;
    let m = this.puzzle[0];
    for (let index = 0; index < this.puzzle.length; index++) {
      if (m > this.puzzle[index]) {
        isGoal = false;
      }
      m = this.puzzle[index];
    }

    return isGoal;
  }

  getName(): string {
    return `
    ${this.puzzle[0]} ${this.puzzle[1]} ${this.puzzle[2]}
    ${this.puzzle[3]} ${this.puzzle[4]} ${this.puzzle[5]}
    ${this.puzzle[6]} ${this.puzzle[7]} ${this.puzzle[8]}
    `;
  }

  getRawName(): string {
    return JSON.stringify(this.puzzle);
  }

  setPuzzle(p: number[]) {
    for (let i = 0; i < p.length; i++) this.puzzle[i] = p[i];
  }

  moveToR(p: number[], i: number) {
    if (i % this.col < this.col - 1) {
      let pc: number[] = [];
      this.copy(pc, p);

      let temp = pc[i + 1];
      pc[i + 1] = pc[i];
      pc[i] = temp;

      let node: NodePuzzle8 = new NodePuzzle8(pc);
      this.children.push(node);
      node.parent = this;
    }
  }

  moveToL(p: number[], i: number) {
    if (i % this.col > 0) {
      let pc: number[] = [];
      this.copy(pc, p);

      let temp = pc[i - 1];
      pc[i - 1] = pc[i];
      pc[i] = temp;

      let node: NodePuzzle8 = new NodePuzzle8(pc);
      this.children.push(node);
      node.parent = this;
    }
  }

  moveToUp(p: number[], i: number) {
    if (i - this.col >= 0) {
      let pc: number[] = [];
      this.copy(pc, p);

      let temp = pc[i - 3];
      pc[i - 3] = pc[i];
      pc[i] = temp;

      let node: NodePuzzle8 = new NodePuzzle8(pc);
      this.children.push(node);
      node.parent = this;
    }
  }

  moveToDown(p: number[], i: number) {
    if (i + this.col < this.puzzle.length) {
      let pc: number[] = [];
      this.copy(pc, p);

      let temp = pc[i + 3];
      pc[i + 3] = pc[i];
      pc[i] = temp;

      let node: NodePuzzle8 = new NodePuzzle8(pc);
      this.children.push(node);
      node.parent = this;
    }
  }
}
