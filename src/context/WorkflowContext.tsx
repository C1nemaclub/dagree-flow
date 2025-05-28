import { createContext, useReducer } from 'react';
import type { WorkflowContextState } from './utils/types';
import {
  initialWorkflowState,
  workflowReducer,
} from './utils/workflow.reducer';

interface WorkflowProviderProps {
  children: React.ReactNode;
}

const WorkflowContext = createContext<WorkflowContextState>(
  {} as WorkflowContextState
);

export const WorkflowProvider = ({ children }: WorkflowProviderProps) => {
  const [state, dispatch] = useReducer(workflowReducer, initialWorkflowState);

  return (
    <WorkflowContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export default WorkflowContext;
