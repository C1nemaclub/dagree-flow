import { stratify, tree } from 'd3-hierarchy';
import type { Edge, Node } from 'reactflow';

const g = tree<Node>();

const getLayoutedElements = (nodes: Node[], edges: Edge[], options) => {
  if (nodes.length === 0) return { nodes, edges };

  const { width, height } = document
    .querySelector(`[data-id="${nodes[0].id}"]`)
    ?.getBoundingClientRect() || { width: 250, height: 150 };
  // console.log({ width, height });
  // console.log("query1", document.querySelector(`[data-id="${nodes[0].id}"]`));
  const hierarchy = stratify<Node>()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
  const root = hierarchy(nodes);
  const layout = g.nodeSize([width * 2, height * 2])(root);

  return {
    nodes: layout.descendants().map((node) => ({
      ...node.data,
      position: { x: node.x, y: node.y },
    })),
    edges,
  };
};

export default getLayoutedElements;
