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
    {
      id: '2',
      data: { label: 'Decision A' },
      position: { x: -200, y: 200 },
      type: 'customNode',
    },
    {
      id: '3',
      data: { label: 'Decision B' },
      position: { x: 200, y: 200 },
      type: 'customNode',
    },
    {
      id: '4',
      data: { label: 'Task A1' },
      position: { x: -300, y: 450 },
      type: 'regularNode',
    },
    {
      id: '5',
      data: { label: 'Task A2' },
      position: { x: -100, y: 450 },
      type: 'customNode',
    },
    {
      id: '6',
      data: { label: 'Task B1' },
      position: { x: 100, y: 450 },
      type: 'regularNode',
    },
    {
      id: '7',
      data: { label: 'Task B2' },
      position: { x: 300, y: 450 },
      type: 'customNode',
    },
    {
      id: '8',
      data: { label: 'Nested Task A2.1' },
      position: { x: -100, y: 700 },
      type: 'customNode',
    },
    {
      id: '9',
      data: { label: 'Nested Task B2.1' },
      position: { x: 300, y: 700 },
      type: 'customNode',
    },
    {
      id: '14',
      data: { label: 'Tricky boy 😈 14' },
      position: { x: 100, y: 950 },
      type: 'customNode',
    },
    {
      id: '10',
      data: { label: 'Final Task' },
      position: { x: 100, y: 950 },
      type: 'regularNode',
    },
    {
      id: '11',
      data: { label: 'Final Task' },
      position: { x: 100, y: 950 },
      type: 'regularNode',
    },
    {
      id: '12',
      data: { label: 'Tricky boy 😈 12' },
      position: { x: 100, y: 950 },
      type: 'regularNode',
    },
    {
      id: '13',
      data: { label: 'Tricky boy 😈 13' },
      position: { x: 100, y: 950 },
      type: 'customNode',
    },

    {
      id: '15',
      data: { label: 'Tricky boy 😈 15' },
      position: { x: 100, y: 950 },
      type: 'customNode',
    },
    {
      id: '16',
      data: { label: 'Tricky boy 😈 16' },
      position: { x: 100, y: 950 },
      type: 'finallyNode',
    },
    {
      id: '17',
      data: { label: 'Tricky boy 😈 17' },
      position: { x: 100, y: 950 },
      type: 'finallyNode',
    },
    {
      id: '18',
      data: { label: 'Tricky boy 😈 18' },
      position: { x: 100, y: 950 },
      type: 'finallyNode',
    },
    {
      id: '19',
      data: { label: 'Tricky boy 😈 19' },
      position: { x: 100, y: 950 },
      type: 'finallyNode',
    },
    {
      id: '20',
      data: { label: 'Tricky boy 😈 20' },
      position: { x: 100, y: 950 },
      type: 'finallyNode',
    },
    {
      id: '21',
      data: { label: 'Loopy boy 😈 21' },
      position: { x: 100, y: 950 },
      type: 'loopNode',
    },
    {
      id: '22',
      data: { label: 'Loopy child 😈 22' },
      position: { x: 100, y: 950 },
      type: 'regularNode',
    },
    {
      id: '23',
      data: { label: 'Loopy child 😈 23' },
      position: { x: 100, y: 950 },
      type: 'regularNode',
    },
  ],
  edges: [
    {
      id: '1-2',
      source: '1',
      target: '2',
      label: 'Go to A decision',
      type: 'step',
    },
    {
      id: 'A1-3',
      source: '4',
      target: '3',
      type: 'step',
    },

    // Decision A branches\
    {
      id: '2-4',
      source: '2',
      sourceHandle: '2-left',
      target: '4',
      label: 'A: Left → A1',
      type: 'step',
    },
    {
      id: '2-5',
      source: '2',
      sourceHandle: '2-right',
      target: '5',
      label: 'A: Right → A2',
      type: 'step',
    },

    // A2 nesting
    {
      id: '5-8',
      source: '5',
      sourceHandle: '5-left',
      target: '8',
      label: '→ A2.1',
      type: 'step',
    },
    {
      id: '8-14',
      source: '8',
      sourceHandle: '8-right',
      target: '14',
      label: '→ A2.1',
      type: 'step',
    },
    // Decision B branches
    {
      id: '3-6',
      source: '3',
      sourceHandle: '3-left',
      target: '6',
      label: 'B: Left → B1',
      type: 'step',
    },
    {
      id: '3-21',
      source: '3',
      sourceHandle: '3-right',
      target: '21',
      label: 'B: Right → B2',
      type: 'step',
    },
    {
      id: '21-7',
      source: '21',
      target: '7',
      label: 'Loop to Condt',
      type: 'step',
    },
    {
      id: '7-12',
      source: '7',
      sourceHandle: '7-left',
      target: '12',
      label: '→ Tricky!!',
      type: 'step',
    },
    // B2 nesting
    {
      id: '7-9',
      source: '7',
      sourceHandle: '7-right',
      target: '9',
      label: '→ B2.1',
      type: 'step',
    },
    // Merging paths
    {
      id: '8-10',
      source: '8',
      sourceHandle: '8-left',
      target: '10',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '10-15',
      source: '10',
      sourceHandle: '10-left',
      target: '15',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '6-11',
      source: '6',
      target: '11',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '5-13',
      source: '5',
      sourceHandle: '5-right',
      target: '13',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '9-16',
      source: '9',
      sourceHandle: '9-left',
      target: '16',
      targetHandle: '16-left',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '9-16',
      source: '9',
      sourceHandle: '9-right',
      target: '16',
      targetHandle: '16-right',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '14-17',
      source: '14',
      sourceHandle: '14-right',
      target: '17',
      targetHandle: '17-right',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '14-17',
      source: '14',
      sourceHandle: '14-left',
      target: '17',
      targetHandle: '17-left',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '13-18',
      source: '13',
      sourceHandle: '13-right',
      target: '18',
      targetHandle: '18-right',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '13-18',
      source: '13',
      sourceHandle: '13-left',
      target: '18',
      targetHandle: '18-left',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '15-19',
      source: '15',
      sourceHandle: '15-right',
      target: '19',
      targetHandle: '19-right',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '15-19',
      source: '15',
      sourceHandle: '15-left',
      target: '19',
      targetHandle: '19-left',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '17-20',
      source: '17',
      sourceHandle: '17-left',
      target: '20',
      targetHandle: '20-left',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '19-20',
      source: '19',
      sourceHandle: '19-right',
      target: '20',
      targetHandle: '20-right',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '21-22',
      source: '21',
      sourceHandle: '21-start',
      target: '22',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '22-23',
      source: '22',
      target: '23',
      label: '→ Final',
      type: 'step',
    },
    {
      id: '23-21',
      source: '23',
      target: '21',
      targetHandle: '21-end',
      label: '→ Final',
      type: 'step',
    },
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
