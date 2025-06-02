import ELK, { type LayoutOptions } from 'elkjs/lib/elk.bundled.js';
import type { Edge, Node } from 'reactflow';

const elk = new ELK();

const getSide = (portId: string, nodetype: string) => {
  if (nodetype === 'loopNode') {
    if (portId.endsWith('-source')) return 'WEST';
    if (portId.endsWith('-target')) return 'NORTH';
    if (portId.endsWith('-start')) return 'EAST';
    if (portId.endsWith('-end')) return 'EAST';
  }
  const side = portId.includes('left')
    ? 'WEST'
    : portId.includes('right') || portId.includes('start')
    ? 'EAST'
    : portId.includes('top')
    ? 'NORTH'
    : portId.includes('bottom') || portId.includes('end')
    ? 'SOUTH'
    : 'EAST';
  return side;
};

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
    } else if (!nodePortsMap.has(edge.source)) {
      // If no sourceHandle, use the source node ID as the port ID
      nodePortsMap.set(edge.source, new Set([edge.source]));
    }
    if (edge.targetHandle) {
      if (!nodePortsMap.has(edge.target))
        nodePortsMap.set(edge.target, new Set());
      nodePortsMap.get(edge.target)?.add(edge.targetHandle);
    } else if (!nodePortsMap.has(edge.target)) {
      // If no targetHandle, use the target node ID as the port ID
      nodePortsMap.set(edge.target, new Set([edge.target]));
    }
  }

  //   for (const edge of edges) {
  //   // Handle source
  //   const sourcePort = edge.sourceHandle ?? edge.source;
  //   if (!nodePortsMap.has(edge.source)) {
  //     nodePortsMap.set(edge.source, new Set());
  //   }
  //   nodePortsMap.get(edge.source)!.add(sourcePort);

  //   // Handle target
  //   const targetPort = edge.targetHandle ?? edge.target;
  //   if (!nodePortsMap.has(edge.target)) {
  //     nodePortsMap.set(edge.target, new Set());
  //   }
  //   nodePortsMap.get(edge.target)!.add(targetPort);
  // }

  console.log(nodePortsMap, 'NODE PORTS MAP');

  const layoutOptions: LayoutOptions = {};

  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': elkDirectionMap[direction],
      'elk.spacing.nodeNode': '10',
      'elk.spacing.edgeNode': '10',
      'elk.portConstraints': 'FIXED_SIDE', // lock ports to the side
      'elk.spacing.layered.nodeNodeBetweenLayers': '250',
      'elk.spacing.edgeEdge': '250',
      'elk.insideSelfLoops.activate': 'true', // activate self-loops
      // 'elk.mrtree.edgeRoutingMode': 'AVOID_OVERLAP',
      // 'elk.separateConnectedComponents': 'FALSE', // separate connected components
      // 'elk.topdown.hierarchicalNodeAspectRatio': '1', // aspect ratio for hierarchical nodes
      'elk.edgeRouting': 'ORTHOGONAL', // or 'POLYLINE'
      'org.eclipse.elk.layered.cycleBreaking.strategy': 'INTERACTIVE',
      'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX', // or 'BRANDES_KOEPF'
    },

    children: nodes.map((node, i) => {
      const portIds = nodePortsMap.get(node.id) ?? new Set();
      return {
        id: node.id,
        width: 300,
        height: 300,
        layoutOptions: {
          'elk.portConstraints': 'FIXED_ORDER',
          // 'elk.direction': elkDirectionMap[direction],
          // 'elk.spacing.edgeEdge': '1000',
          // 'elk.spacing.layered.nodeNodeBetweenLayers': '1000',
          // 'elk.spacing.nodeNode': '100',
          // 'elk.algorithm': 'layered',
        },
        ports: Array.from(portIds).map((portId) => {
          // Always return an ElkPort object, not a string
          const finalSide = getSide(portId, node.type ?? '');

          return {
            id: portId,
            width: 10,
            height: 10,
            properties: {
              'elk.port.side': finalSide,
            },
          };
        }),
      };
    }),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.sourceHandle ?? edge.source],
      targets: [edge.targetHandle ?? edge.target],
    })),
  };
  const layout = await elk.layout(graph);
  console.log(layout, 'hello');

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
