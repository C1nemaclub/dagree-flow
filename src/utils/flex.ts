import { layoutFromMap } from 'entitree-flex';
import { getOutgoers, Position, type Edge, type Node } from 'reactflow';

const nodeWidth = 300;
const nodeHeight = 200;
const Orientation = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
};
const entitreeSettings = {
  clone: true, // returns a copy of the input, if your application does not allow editing the original object
  enableFlex: true, // has slightly better perfomance if turned off (node.width, node.height will not be read)
  firstDegreeSpacing: 100, // spacing in px between nodes belonging to the same source, eg children with same parent
  nextAfterAccessor: 'spouses', // the side node prop used to go sideways, AFTER the current node
  nextAfterSpacing: 100, // the spacing of the "side" nodes AFTER the current node
  nextBeforeAccessor: 'siblings', // the side node prop used to go sideways, BEFORE the current node
  nextBeforeSpacing: 100, // the spacing of the "side" nodes BEFORE the current node
  nodeHeight, // default node height in px
  nodeWidth, // default node width in px
  orientation: Orientation.Vertical, // "vertical" to see parents top and children bottom, "horizontal" to see parents left and
  rootX: 0, // set root position if other than 0
  rootY: 0, // set root position if other than 0
  secondDegreeSpacing: 100, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
  sourcesAccessor: 'parents', // the prop used as the array of ancestors ids
  sourceTargetSpacing: 100, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
  targetsAccessor: 'children', // the prop used as the array of children ids
};

const { Top, Bottom } = Position;
export const layoutElementsFlex = (
  allNodes: Node[],
  rootId: string,
  direction = 'TB',
  allEdges: Edge[] = []
) => {
  // Convert allNodes to a map for entitree
  const tree = allNodes.reduce((acc, node) => {
    acc[node.id] = {
      ...node,
      children: getOutgoers(node, allNodes, allEdges),
    };
    return acc;
  }, {} as Record<string | number, Node>);

  console.log(tree, 'TREEE');

  //   const isTreeHorizontal = direction === 'LR';

  const { nodes: entitreeNodes, rels: entitreeEdges } = layoutFromMap(
    rootId,
    tree,
    {
      ...entitreeSettings,
      orientation: 'vertical',
    }
  );

  const nodes: Node[] = [],
    edges: Edge[] = [];

  entitreeEdges.forEach((edge) => {
    const sourceNode = edge.source.id;
    const targetNode = edge.target.id;

    const newEdge = {} as Edge;

    newEdge.id = 'e' + sourceNode + targetNode;
    newEdge.source = sourceNode;
    newEdge.target = targetNode;
    newEdge.type = 'smoothstep';
    newEdge.sourceHandle = Bottom;
    newEdge.targetHandle = Top;

    edges.push(newEdge);
  });

  entitreeNodes.forEach((node) => {
    const newNode = {} as Node;
    console.log('data', node.id, 'aqui');

    // const isSpouse = !!node?.isSpouse;
    // const isSibling = !!node?.isSibling;
    const isRoot = node?.id === rootId;

    // if (isSpouse) {
    //   newNode.sourcePosition = isTreeHorizontal ? Bottom : Right;
    //   newNode.targetPosition = isTreeHorizontal ? Top : Left;
    // } else if (isSibling) {
    //   newNode.sourcePosition = isTreeHorizontal ? Top : Left;
    //   newNode.targetPosition = isTreeHorizontal ? Bottom : Right;
    // } else {
    //   newNode.sourcePosition = isTreeHorizontal ? Right : Bottom;
    //   newNode.targetPosition = isTreeHorizontal ? Left : Top;
    // }

    newNode.data = { label: 'Layered!', direction, isRoot, ...node };
    newNode.id = node.id;
    // newNode.type = 'custom';
    newNode.type = node.type || 'default';

    newNode.width = nodeWidth;
    newNode.height = nodeHeight;

    newNode.position = {
      x: node.x,
      y: node.y,
    };

    nodes.push(newNode);
  });

  return { nodes, edges };
};
