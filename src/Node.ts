export class NodeE {
  children: Array<NodeE> = new Array();
  parent: NodeE | undefined;
  puzzle: number[] = [];
  x: number = 0;
  col: number = 3;

  constructor(p: number[]) {
    this.setPuzzle(p);
  }

  setPuzzle(p: number[]) {
    for (let i = 0; i < p.length; i++) this.puzzle[i] = p[i];
  }

  expandMove() {
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

  moveToR(p: number[], i: number) {
    if (i % this.col < this.col - 1) {
      let pc: number[] = [];
      this.copy(pc, p);

      let temp = pc[i + 1];
      pc[i + 1] = pc[i];
      pc[i] = temp;

      let node: NodeE = new NodeE(pc);
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

      let node: NodeE = new NodeE(pc);
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

      let node: NodeE = new NodeE(pc);
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

      let node: NodeE = new NodeE(pc);
      this.children.push(node);
      node.parent = this;
    }
  }

  printPuzzle() {
    let f = this.puzzle;

    console.log(
      `
         ${f[0]} ${f[1]} ${f[2]}
         ${f[3]} ${f[4]} ${f[5]}
         ${f[6]} ${f[7]} ${f[8]}
      `
    );
  }

  isSamePuzzle(p: number[]): boolean {
    let same = true;
    for (let index = 0; index < p.length; index++) {
      if (this.puzzle[index] != p[index]) same = false;
    }
    return same;
  }

  copy(a: number[], b: number[]) {
    for (let i = 0; i < b.length; i++) a[i] = b[i];
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
}
