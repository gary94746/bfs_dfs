export abstract class NodeA {
  children: Array<NodeA> = new Array();
  parent: NodeA | undefined;
  specificProperty: any;
  id: number = 0;

  abstract expandMove(): void;

  abstract printNode(): void;

  abstract isSame(node: NodeA): boolean;

  abstract clone(currentState: any): void;

  abstract goalState(): boolean;

  abstract getName(): string;

  abstract getRawName(): string;
}
