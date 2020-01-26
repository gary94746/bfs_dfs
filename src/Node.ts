export abstract class NodeA {
  protected children: Array<NodeA> = new Array();
  protected parent: NodeA | undefined;
  protected id: number = 0;

  abstract expandMove(): void;

  abstract printNode(): void;

  abstract isSame(node: NodeA): boolean;

  abstract goalState(): boolean;

  abstract getName(): string;

  abstract getRawName(): string;

  abstract getChilds(): NodeA[];

  abstract setParent(parent: NodeA): void;

  abstract getParent(): NodeA | undefined;

  abstract getId(): number;

  abstract setId(id: number): void;

}
