import { NodeA } from "./Node";
import * as fs from "fs";

export class ExportData {
  forGraph: ForGraph[] = new Array();

  constructor(generatedNodes: Array<NodeA>, private path: Array<NodeA>) {
    // push every generated node in forGraph, create instance
    generatedNodes.forEach(e => {
      this.forGraph.push(new ForGraph(e.id, e.parent?.id, e.getName()));
    });

    // for path, apply different style
    this.path.forEach(e => {
      const index = this.forGraph.findIndex(f => f.id == e.id);
      this.forGraph[index].cls = "expected";
    });
  }

  toJSON(path: string) {
    // write in file
    fs.writeFileSync(path, JSON.stringify(this.forGraph));
  }
}

class ForGraph {
  constructor(
    public id: number,
    public parent: number | undefined,
    public name: string,
    public cls?: string
  ) {}
}
