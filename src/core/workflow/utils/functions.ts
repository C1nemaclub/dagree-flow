import type { Edge, Node } from 'reactflow';
import { createRandomString } from '../../../utils/functions';

export const findNode = (nodeId: string, nodes: Node[]) => {
  return nodes.find((node) => node.id === nodeId);
};

export const getNodePosition = (node: Node) => {
  return {
    x: node.position.x,
    y: node.position.y,
  };
};

export const createNode = (props?: Partial<Node>): Node => {
  return {
    id: createRandomString(),
    data: {
      label: 'New Node',
    },
    position: { x: 0, y: 0 },
    type: 'customNode',
    ...props,
  };
};

export const createEdge = (source: string, target: string): Edge => {
  return {
    id: `${source}-${target}`,
    source,
    target,
    label: 'to the',
    type: 'step',
  };
};
