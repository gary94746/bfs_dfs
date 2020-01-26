import { NodeA } from "./Node";

export const parseData = (generatedNodes: Array<NodeA>, path: Array<NodeA>) => {

  const toExport: ForGraph[] = generatedNodes.map(e => {
    return {
      id: e.getId(),
      parent: e.getParent()?.getId(),
      name: e.getName()
    };
  });

  path.forEach(e => {
    const index = toExport.findIndex(f => f.id == e.getId());
    if (index != -1)
      toExport[index].cls = "expected";
  });

  return toExport;
}

export type ForGraph = {
  id: number,
  parent: number | undefined,
  name: string,
  cls?: string
}