import { NodeA } from "./Node";

export const printDiagraph = (generatedNodes: NodeA[], path: NodeA[]) => {
  console.log("digraph D {");

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
      console.log(
        `${node.getId()} [label = "${node.getName()}" fillcolor="#ffbb33" style=filled shape=diamond]`
      );
    } else {
      console.log(`${node.getId()} [label = "${node.getName()}"]`);
    }

    if (childs.length > 0) {
      // print the relation if exists
      console.log(`${node.getId()}->{${childs}} `);
    }
  });

  // new lines to remark the solved path
  path.forEach((node, index) => {
    if (index < path.length - 1)
      console.log(
        `${node.getId()}->{${path[
          index + 1
        ].getId()}} [penwidth=5, arrowhead=dot]`
      );
  });

  console.log("}");
};
