import ELK from 'elkjs/lib/elk.bundled.js';
import type { Edge, Node } from 'reactflow';

const elk = new ELK();

const layoutElkjs = async (
  nodes: Node[],
  edges: Edge[],
  direction: 'RIGHT' | 'DOWN' | 'LEFT' | 'UP' = 'DOWN'
) => {
  const elkDirectionMap = {
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    UP: 'UP',
  };

  // Step 1: Map nodeId => Set of port IDs (from sourceHandle / targetHandle)
  const nodePortsMap = new Map<string, Set<string>>();

  for (const edge of edges) {
    if (edge.sourceHandle) {
      if (!nodePortsMap.has(edge.source))
        nodePortsMap.set(edge.source, new Set());
      nodePortsMap.get(edge.source)?.add(edge.sourceHandle);
    }
    if (edge.targetHandle) {
      if (!nodePortsMap.has(edge.target))
        nodePortsMap.set(edge.target, new Set());
      nodePortsMap.get(edge.target)?.add(edge.targetHandle);
    }
  }

  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': elkDirectionMap[direction],
      'elk.spacing.nodeNode': '100',
      'elk.portConstraints': 'FIXED_SIDE', // lock ports to the side
      'elk.spacing.layered.nodeNodeBetweenLayers': '1000',
      'elk.spacing.edgeEdge': '1000',
    },
    children: nodes.map((node) => {
      const portIds = nodePortsMap.get(node.id) ?? new Set();
      return {
        id: node.id,
        width: 300,
        height: 300,
        layoutOptions: {
          'elk.portConstraints': 'FIXED_ORDER',
          'elk.direction': elkDirectionMap[direction],
          'elk.spacing.edgeEdge': '1000',
          'elk.spacing.layered.nodeNodeBetweenLayers': '1000',
          'elk.spacing.nodeNode': '100',
          'elk.algorithm': 'layered',
        },
        ports: Array.from(portIds).map((portId) => {
          console.log(portId, 'PORT ID');
          const side = portId.includes('left')
            ? 'WEST'
            : portId.includes('right')
            ? 'EAST'
            : portId.includes('top')
            ? 'NORTH'
            : portId.includes('bottom')
            ? 'SOUTH'
            : 'EAST';

          return {
            id: portId,
            width: 10,
            height: 10,
            properties: {
              'elk.port.side': side,
            },
          };
        }),
      };
    }),
    edges: edges.map((edge) => ({
      id: edge.id,
      //   sources: [edge.source],
      //   targets: [edge.target],
      //   sourcePort: edge.sourceHandle,
      //   targetPort: edge.targetHandle,
      //   sources: [edge.sourceHandle ?? edge.source],
      //   targets: [edge.targetHandle ?? edge.target],
      //   sources: [edge.source, edge.sourceHandle], // nodeId + portId
      //   targets: [edge.target, edge.targetHandle], // nodeId + portId
      //       sources: ['sourceNodeId'],      // array of nodes (just 1 node usually)
      //   targets: ['targetNodeId'],      // array of nodes (just 1 node usually)
      //   sourcePort: 'sourcePortId',     // optional: port id on source node
      //   targetPort: 'targetPortId',     // optional: port id on target node

      sources: [edge.sourceHandle ?? edge.source],
      targets: [edge.targetHandle ?? edge.target],
      sourcePort: edge.sourceHandle,
      targetPort: edge.targetHandle,
    })),
  };
  const layout = await elk.layout(graph);
  const nodeMap = new Map((layout.children ?? []).map((n) => [n.id, n]));

  const layoutedNodes = nodes.map((node) => {
    const layoutNode = nodeMap.get(node.id);

    return {
      ...node,
      position: {
        x: layoutNode?.x ?? 0,
        y: layoutNode?.y ?? 0,
      },
      data: {
        ...node.data,
        _elkPorts: layoutNode?.ports, // Optional: useful for debugging port positions
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
};

export default layoutElkjs;
