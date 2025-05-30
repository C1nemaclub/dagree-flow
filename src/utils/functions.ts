import dagre from 'dagre';
import { Edge, Node, Position } from 'reactflow';
export const createRandomString = () => {
  return Math.random().toString(36).substring(2, 15);
};

const widthX = 300;
const heightY = 200;

export function layoutElements(
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB'
): { nodes: Node[]; edges: Edge[] } {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  // Add nodes with dimensions
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: widthX, height: heightY });
  });

  // Add edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply layout to nodes
  const layoutedNodes = nodes.map((node) => {
    const pos = dagreGraph.node(node.id);

    return {
      ...node,
      position: { x: pos.x - widthX / 2, y: pos.y - heightY / 2 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      // sourcePosition: isConditional ? Position.Right : Position.Bottom,
      // targetPosition: isConditional ? Position.Left : Position.Top,
    };
  });

  return { nodes: layoutedNodes, edges };
}
