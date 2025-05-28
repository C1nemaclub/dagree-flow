import type { Edge, Node, OnEdgesChange, OnNodesChange } from 'reactflow';

export type WorkflowReducerState = {
  name: string;
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
};

export const workflowActions = {
  SET_NAME: 'SET_NAME',
  SET_NODES: 'SET_NODES',
  SET_EDGES: 'SET_EDGES',
  SET_SELECTED_NODE: 'SET_SELECTED_NODE',
  UPDATE_NODE: 'UPDATE_NODE',
  UPDATE_NODES: 'UPDATE_NODES',
  UPDATE_EDGES: 'UPDATE_EDGES',
  CREATE_CONNECTED_NODE: 'CREATE_CONNECTED_NODE',
} as const;

export type WorkflowActions =
  (typeof workflowActions)[keyof typeof workflowActions];

export type SetNodeAction = {
  type: typeof workflowActions.SET_NODES;
  payload: WorkflowReducerState['nodes'];
};

export type SetEdgeAction = {
  type: typeof workflowActions.SET_EDGES;
  payload: WorkflowReducerState['edges'];
};

export type SetNameAction = {
  type: typeof workflowActions.SET_NAME;
  payload: WorkflowReducerState['name'];
};

export type SetSelectedNodeAction = {
  type: 'SET_SELECTED_NODE';
  payload: WorkflowReducerState['selectedNodeId'];
};

export type UpdateNodeAction = {
  type: 'UPDATE_NODE';
  payload: {
    id: string;
    data: Partial<Node['data']>;
  };
};

export type UpdateNodesAction = {
  type: 'UPDATE_NODES';
  payload: Parameters<OnNodesChange>[0];
};

export type UpdateEdgesAction = {
  type: 'UPDATE_EDGES';
  payload: Parameters<OnEdgesChange>[0];
};

export type CreateConnectedNodeAction = {
  type: 'CREATE_CONNECTED_NODE';
  payload: {
    fromId: string;
  };
};

export type WorkflowAction =
  | SetNameAction
  | SetNodeAction
  | SetEdgeAction
  | SetSelectedNodeAction
  | UpdateNodeAction
  | UpdateNodesAction
  | UpdateEdgesAction
  | CreateConnectedNodeAction;
export type WorkflowContextState = {
  state: WorkflowReducerState;
  dispatch: React.Dispatch<WorkflowAction>;
};
