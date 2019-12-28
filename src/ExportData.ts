import { NodeA } from "./Node";
import * as fs from "fs";

export class ExportData {
  forGraph: ForGraph[] = new Array();

  constructor(generatedNodes: Array<NodeA>) {
    generatedNodes.forEach(e => {
      this.forGraph.push(
        new ForGraph(e.id, e.parent?.id, e.getRawName(), e.getName())
      );
    });

    this.forGraph[this.forGraph.length - 1].cls = "expected";
  }

  toJSON(path: string) {
    fs.writeFileSync(path, JSON.stringify(this.forGraph));
  }

  getUnique(arr: any, comp: any) {
    const unique = arr
      .map((e: any) => e[comp])

      // store the keys of the unique objects
      .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e: any) => arr[e])
      .map((e: any) => arr[e]);

    return unique;
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
