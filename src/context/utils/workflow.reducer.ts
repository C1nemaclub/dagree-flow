import { applyEdgeChanges, applyNodeChanges } from 'reactflow';
import {
  createEdge,
  createNode,
  findNode,
} from '../../core/workflow/utils/functions';
import {
  workflowActions,
  type WorkflowAction,
  type WorkflowReducerState,
} from './types';

export const initialWorkflowState: WorkflowReducerState = {
  name: 'Nested Workflow',
  nodes: [
    {
      id: '1',
      data: { label: 'Start' },
      position: { x: 0, y: 0 },
      type: 'regularNode',
    },
    // custom node
    {
      id: '2',
      data: { label: 'Decision A', description: 'Choose A1 or A2' },
      position: { x: 0, y: 100 },
      type: 'customNode',
    },
    {
      // Left regular
      id: '3',
      data: { label: 'Decision B', description: 'Choose B1 or B2' },
      position: { x: -200, y: 200 },
      type: 'regularNode',
    },
    {
      // right regular
      id: '4',
      data: { label: 'A1', description: 'A1 Node' },
      position: { x: 200, y: 200 },
      type: 'regularNode',
    },
    {
      id: '5',
      data: { label: 'Custom Node', description: 'This is a custom node' },
      position: { x: 0, y: 300 },
      type: 'customNode',
    },
    // Add more nodes as needed
    {
      id: '6',
      data: { label: 'B1', description: 'B1 Node' },
      position: { x: -200, y: 300 },
      type: 'regularNode',
    },
    {
      id: '7',
      data: { label: 'B2', description: 'B2 Node' },
      position: { x: 200, y: 300 },
      type: 'regularNode',
    },
    {
      id: '8',
      data: { label: 'A2.1', description: 'A2.1 Node' },
      position: { x: -200, y: 400 },
      type: 'regularNode',
    },
    {
      id: '9',
      data: { label: 'B2.1', description: 'B2.1 Node' },
      position: { x: 0, y: 0 },
      type: 'regularNode',
    },
    {
      id: '10',
      data: { label: 'Final Node', description: 'Final Node' },
      position: { x: 0, y: 500 },
      type: 'regularNode',
    },
    // add two finally nodes
    {
      id: '11',
      data: { label: 'B2.2', description: 'B2.2 Node' },
      position: { x: 0, y: 0 },
      type: 'finallyNode',
    },
    {
      id: '12',
      data: { label: 'Final Node', description: 'Final Node' },
      position: { x: 0, y: 500 },
      type: 'finallyNode',
    },
    {
      id: 'loop',
      data: {
        label: 'Loop Node',
      },
      position: { x: 0, y: 600 },
      type: 'loopNode',
    },
    {
      id: 'loop-internal',
      data: { label: 'Intern', description: 'Final Node' },
      position: { x: 0, y: 500 },
      type: 'regularNode',
    },
    {
      id: 'next',
      data: { label: 'next', description: 'Final Node' },
      position: { x: 0, y: 500 },
      type: 'regularNode',
    },
    {
      id: 'next-2',
      data: { label: 'next', description: 'Final Node' },
      position: { x: 0, y: 500 },
      type: 'regularNode',
    },
    {
      id: 'triple',
      data: { label: 'Triple!!', description: 'Choose A1 or A2' },
      position: { x: 0, y: 100 },
      type: 'customNode',
    },
    {
      id: 'triple-finally',
      data: { label: 'Final Node', description: 'Final Node' },
      position: { x: 0, y: 500 },
      type: 'finallyNode',
    },
  ],

  edges: [
    {
      id: 'loop-internal',
      source: 'loop',
      sourceHandle: 'loop-start',
      target: 'loop-internal',
      label: 'Loop to Internal Node',
      type: 'step',
    },
    {
      id: 'internal-loop-triple',
      source: 'loop-internal',
      target: 'triple',
      label: 'Loop to Internal Node',
      type: 'step',
    },
    {
      id: 'triple-finally-internal-loop',
      source: 'triple-finally',
      target: 'loop',
      targetHandle: 'loop-end',
      label: 'Loop to Internal Node',
      type: 'step',
    },
    {
      id: '1-2',
      source: '1',
      target: '2',
      label: 'Go to Decision A',
      type: 'step',
    },
    {
      id: '2-4',
      source: '2',
      sourceHandle: '2-left',
      target: '4',
      label: 'A: Go to A1',
      type: 'step',
    },
    {
      id: '3-5',
      source: '3',
      target: '5',
      label: 'B: Go to Custom Node',
      type: 'step',
    },
    // Connect edges as needed
    {
      id: '5-6',
      source: '5',
      sourceHandle: '5-left',
      target: '6',
      label: 'B: Go to B1',
      type: 'step',
    },
    {
      id: '5-7',
      source: '5',
      sourceHandle: '5-right',
      target: '7',
      label: 'B: Go to B2',
      type: 'step',
    },
    {
      id: '6-10',
      source: '6',
      target: '10',
      label: 'B1 → Final Node',
      type: 'step',
    },
    // 7 to 9
    {
      id: '7-9',
      source: '7',
      sourceHandle: '7-right',
      target: '9',
      label: 'B2 → Final Node',
      type: 'step',
    },
    // connect 2 right to 8
    {
      id: '2-8',
      source: '2',
      sourceHandle: '2-right',
      target: '8',
      label: 'A: Go to A2.1',
      type: 'step',
    },
    {
      id: '8-loop',
      source: '8',
      target: 'loop',
      label: 'A: Go to A2.1',
      type: 'step',
    },
    {
      id: 'loop-next',
      source: 'loop',
      target: 'next',
      label: 'A: Go to A2.1',
      type: 'step',
    },
    {
      id: 'next-next2',
      source: 'next',
      target: 'next-2',
      label: 'A: Go to A2.1',
      type: 'step',
    },
    {
      id: 'next-2-12',
      source: 'next-2',
      target: '12',
      targetHandle: '12-right',
      label: 'A: Go to A2.1',
      type: 'step',
    },
    {
      id: '10-11',
      source: '10',
      target: '11',
      targetHandle: '11-left',
      label: 'A: Go to A2.1',
      type: 'step',
    },
    {
      id: '9-11',
      source: '9',
      target: '11',
      targetHandle: '11-right',
      label: 'A: Go to A2.1',
      type: 'step',
    },
    {
      id: '11-12',
      source: '11',
      target: '12',
      targetHandle: '12-left',
      label: 'A: Go to A2.1',
      type: 'step',
    },
    {
      id: '4-3',
      source: '4',
      target: '3',
      label: 'A2.1 → Decision B',
      type: 'step',
    },
    {
      id: 'triple-triple-finally',
      source: 'triple',
      target: 'triple-finally',
      targetHandle: 'triple-finally-right',
      sourceHandle: 'triple-right',
      label: 'A2.1 → Decision B',
      type: 'step',
    },
    {
      id: 'triple-triple-finallyx',
      source: 'triple',
      target: 'triple-finally',
      targetHandle: 'triple-finally-left',
      sourceHandle: 'triple-left',
      label: 'A2.1 → Decision B',
      type: 'step',
    },
    // {
    //   id: '3-7',
    //   source: '3',
    //   sourceHandle: '3-right',
    //   target: '7',
    //   label: 'B: Go to B2',
    //   type: 'step',
    // },
    // {
    //   id: '4-8',
    //   source: '4',
    //   target: '8',
    //   label: 'A1 → A2.1',
    //   type: 'step',
    // },
    // {
    //   id: '5-9',
    //   source: '5',
    //   target: '9',
    //   label: 'Custom Node → B2.1',
    //   type: 'step',
    // },
    // {
    //   id: '6-10',
    //   source: '6',
    //   target: '10',
    //   label: 'B1 → Final Node',
    //   type: 'step',
    // },
    // {
    //   id: '7-10',
    //   source: '7',
    //   target: '10',
    //   label: 'B2 → Final Node',
    //   type: 'step',
    // },

    // {
    //   id: '1-2',
    //   source: '1',
    //   target: '2',
    //   label: 'Go to A decision',
    //   type: 'step',
    // },
    // {
    //   id: 'A1-3',
    //   source: '4',
    //   target: '3',
    //   type: 'step',
    // },
    // // Decision A branches\
    // {
    //   id: '2-4',
    //   source: '2',
    //   sourceHandle: '2-left',
    //   target: '4',
    //   label: 'A: Left → A1',
    //   type: 'step',
    // },
    // {
    //   id: '2-5',
    //   source: '2',
    //   sourceHandle: '2-right',
    //   target: '5',
    //   label: 'A: Right → A2',
    //   type: 'step',
    // },
    // // A2 nesting
    // {
    //   id: '5-8',
    //   source: '5',
    //   sourceHandle: '5-left',
    //   target: '8',
    //   label: '→ A2.1',
    //   type: 'step',
    // },
    // {
    //   id: '8-24',
    //   source: '8',
    //   sourceHandle: '8-right',
    //   target: '24',
    //   label: '→ A2.1',
    //   type: 'step',
    // },
    // {
    //   id: '24-14',
    //   source: '24',
    //   sourceHandle: '24-right',
    //   target: '14',
    //   label: '→ A2.1',
    //   type: 'step',
    // },
    // // Decision B branches
    // {
    //   id: '3-6',
    //   source: '3',
    //   sourceHandle: '3-left',
    //   target: '6',
    //   label: 'B: Left → B1',
    //   type: 'step',
    // },
    // {
    //   id: '3-21',
    //   source: '3',
    //   sourceHandle: '3-right',
    //   target: '21',
    //   label: 'B: Right → B2',
    //   type: 'step',
    // },
    // {
    //   id: '21-7',
    //   source: '21',
    //   target: '7',
    //   label: 'Loop to Condt',
    //   type: 'step',
    // },
    // {
    //   id: '7-12',
    //   source: '7',
    //   sourceHandle: '7-left',
    //   target: '12',
    //   label: '→ Tricky!!',
    //   type: 'step',
    // },
    // // B2 nesting
    // {
    //   id: '7-9',
    //   source: '7',
    //   sourceHandle: '7-right',
    //   target: '9',
    //   label: '→ B2.1',
    //   type: 'step',
    // },
    // // Merging paths
    // {
    //   id: '8-10',
    //   source: '8',
    //   sourceHandle: '8-left',
    //   target: '10',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '10-15',
    //   source: '10',
    //   sourceHandle: '10-left',
    //   target: '15',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '6-11',
    //   source: '6',
    //   target: '11',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '5-13',
    //   source: '5',
    //   sourceHandle: '5-right',
    //   target: '13',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '9-16-left',
    //   source: '9',
    //   sourceHandle: '9-left',
    //   target: '16',
    //   targetHandle: '16-left',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '9-16-right',
    //   source: '9',
    //   sourceHandle: '9-right',
    //   target: '16',
    //   targetHandle: '16-right',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '14-17-right',
    //   source: '14',
    //   sourceHandle: '14-right',
    //   target: '17',
    //   targetHandle: '17-right',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '14-17-left',
    //   source: '14',
    //   sourceHandle: '14-left',
    //   target: '17',
    //   targetHandle: '17-left',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '13-18-right',
    //   source: '13',
    //   sourceHandle: '13-right',
    //   target: '18',
    //   targetHandle: '18-right',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '13-18',
    //   source: '13',
    //   sourceHandle: '13-left',
    //   target: '18',
    //   targetHandle: '18-left',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '15-19-right',
    //   source: '15',
    //   sourceHandle: '15-right',
    //   target: '19',
    //   targetHandle: '19-right',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '15-19',
    //   source: '15',
    //   sourceHandle: '15-left',
    //   target: '19',
    //   targetHandle: '19-left',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '17-20',
    //   source: '17',
    //   sourceHandle: '17-left',
    //   target: '20',
    //   targetHandle: '20-left',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '19-20',
    //   source: '19',
    //   sourceHandle: '19-right',
    //   target: '20',
    //   targetHandle: '20-right',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '21-22',
    //   source: '21',
    //   sourceHandle: '21-start',
    //   target: '22',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '22-23',
    //   source: '22',
    //   target: '23',
    //   label: '→ Final',
    //   type: 'step',
    // },
    // {
    //   id: '23-21',
    //   source: '23',
    //   target: '21',
    //   targetHandle: '21-end',
    //   label: '→ Final',
    //   type: 'step',
    // },
  ],
  selectedNodeId: null,
};

export const workflowReducer = (
  state: WorkflowReducerState,
  action: WorkflowAction
): WorkflowReducerState => {
  switch (action.type) {
    case workflowActions.SET_EDGES:
      return {
        ...state,
        edges: action.payload,
      };
    case workflowActions.SET_NODES:
      return {
        ...state,
        nodes: action.payload,
      };
    case workflowActions.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case workflowActions.SET_SELECTED_NODE:
      return {
        ...state,
        selectedNodeId: action.payload,
      };
    case workflowActions.UPDATE_NODE:
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.id
            ? { ...node, data: { ...node.data, ...action.payload.data } }
            : node
        ),
      };
    case workflowActions.UPDATE_NODES:
      return { ...state, nodes: applyNodeChanges(action.payload, state.nodes) };
    case workflowActions.UPDATE_EDGES:
      return { ...state, edges: applyEdgeChanges(action.payload, state.edges) };
    case workflowActions.CREATE_CONNECTED_NODE: {
      const anchorNode = findNode(action.payload.fromId, state.nodes);
      if (!anchorNode) return state;
      const newNode = createNode({
        position: {
          x: anchorNode.position.x,
          y: anchorNode.position.y + 100,
        },
      });
      return {
        ...state,
        nodes: [...state.nodes, newNode],
        edges: [...state.edges, createEdge(action.payload.fromId, newNode.id)],
      };
    }
    default:
      return state;
  }
};
