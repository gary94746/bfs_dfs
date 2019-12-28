import { NodeA } from "./Node";
import * as fs from "fs";

export class ExportData {
  forGraph: ForGraph[] = new Array();

  constructor(
    generatedNodes: Array<NodeA>,
    rootNode: NodeA,
    idGoalNode: number
  ) {
    generatedNodes.forEach(e => {
      this.forGraph.push(
        new ForGraph(e.id, e.parent?.id, e.getRawName(), e.getName())
      );
    });

    this.forGraph.push(
      new ForGraph(
        rootNode.id,
        rootNode.parent?.id,
        rootNode.getRawName(),
        rootNode.getName()
      )
    );

    // for extra css
    const finded = this.forGraph.find(a => (a.id = idGoalNode));
    if (finded != undefined) {
      const indexNode = this.forGraph.indexOf(finded);
      this.forGraph[indexNode].cls = "expected";
    }
  }

  toJSON(path: string) {
    const exportedData = this.forGraph.filter(
      (node, index, self) =>
        index === self.findIndex(t => t.id === node.id && t.id === node.id)
    );

    fs.writeFileSync(path, JSON.stringify(exportedData));
  }
}

class ForGraph {
  constructor(
    public id: number,
    public parent: number | undefined,
    public name: string,
    public value: string,
    public cls?: string
  ) {}
}
