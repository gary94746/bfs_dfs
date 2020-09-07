import { NodeA } from "./Node";

export const diagramTemplate = (generatedNodes: NodeA[], path: NodeA[]) => {
  let exportedString = "";
  exportedString += "digraph D {\n";

  generatedNodes.forEach((node) => {
    // join all the childs, separed by ,
    const childs = node
      .getChilds()
      .map((e) => e.getId())
      .filter((e) => e != 0)
      .join(",");

    //check if the current node is in path
    const finded = path.some((nodePath) => nodePath.getId() == node.getId());

    // if is in path changes style
    if (finded) {
      exportedString += `${node.getId()} [label = "${node.getName()}" fillcolor="#ffbb33" style=filled shape=diamond]\n`;
    } else {
      exportedString += `${node.getId()} [label = "${node.getName()}"]\n`;
    }

    if (childs.length > 0) {
      // print the relation if exists
      exportedString += `${node.getId()}->{${childs}}\n`;
    }
  });

  // new lines to remark the solved path
  path.forEach((node, index) => {
    if (index < path.length - 1)
      exportedString += `${node.getId()}->{${path[
        index + 1
      ].getId()}} [penwidth=5, arrowhead=dot]\n`;
  });

  exportedString += "}";

  return exportedString;
};
