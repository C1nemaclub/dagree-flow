import { useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  type Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import { workflowActions } from './context/utils/types';
import useWorkflow from './context/utils/useWorkflow';
import { nodeTypes } from './core/workflow/utils/constants';
import layoutElkjs from './utils/elk';
import { layoutElements } from './utils/functions';

function App() {
  const { state, dispatch } = useWorkflow();
  const [newName, setNewName] = useState('');
  const [elkNodes, setElkNodes] = useState(state.nodes);
  const [elkEdges, setElkEdges] = useState(state.edges);

  const onConnect = (connection: Connection) => {
    const newEdge = addEdge(connection, state.edges);
    dispatch({ type: workflowActions.SET_EDGES, payload: newEdge });
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => layoutElements(state.nodes, state.edges, 'TB'),
    []
  );

  // console.log(layoutedNodes);
  console.log(layoutedEdges);

  // const data = layoutElementsFlex(state.nodes, '1', 'TB', state.edges);
  // console.log(data, 'Datita');

  const handleELk = async () => {
    const elk = await layoutElkjs(state.nodes, state.edges, 'DOWN');
    setElkNodes(elk.nodes);
    setElkEdges(elk.edges);
  };
  useEffect(() => {
    handleELk();
  }, []);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        width: '100%',
        border: '1px solid red',
        flexDirection: 'row',
      }}>
      <div style={{ height: '100%', width: '100%' }}>
        <h3>{state.name}</h3>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={elkNodes}
          edges={layoutedEdges}
          onConnect={onConnect}
          onNodesChange={(changes) =>
            dispatch({ type: workflowActions.UPDATE_NODES, payload: changes })
          }
          onEdgesChange={(changes) =>
            dispatch({ type: workflowActions.UPDATE_EDGES, payload: changes })
          }
          onNodeClick={(_, node) => {
            dispatch({
              type: workflowActions.SET_SELECTED_NODE,
              payload: node.id,
            });
          }}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      {/* EDIT NODE */}
      {state.selectedNodeId && (
        <form
          style={{
            border: '1px solid red',
            width: '300px',
            height: '100%',
            padding: '10px',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            if (state.selectedNodeId === null) return;
            dispatch({
              type: workflowActions.UPDATE_NODE,
              payload: {
                id: state.selectedNodeId,
                data: {
                  label: newName,
                },
              },
            });
          }}>
          <h3>Edit Node</h3>
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder='Node Name'
          />
          <button
            type='submit'
            style={{
              width: '100%',
              marginTop: '10px',
            }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
