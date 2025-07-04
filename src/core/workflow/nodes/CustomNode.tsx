import { Handle, Position, type NodeProps } from 'reactflow';
import { workflowActions } from '../../../context/utils/types';
import useWorkflow from '../../../context/utils/useWorkflow';

const CustomNode = ({ id, data }: NodeProps) => {
  const { dispatch } = useWorkflow();
  return (
    <>
      <div
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #222',
          color: '#222',
          textAlign: 'center',
          width: '200px',
          backgroundColor: id === '10' || id === '24' ? 'red' : '#fff',
        }}>
        {id}
        <p>{data.label}</p>
        <button
          onClick={() => {
            dispatch({
              type: workflowActions.CREATE_CONNECTED_NODE,
              payload: {
                fromId: id,
              },
            });
          }}>
          Create node below
          {/* <pre>{JSON.stringify({ x: data._elkPorts }, null, 2)}</pre> */}
        </button>
      </div>
      <Handle
        type='target'
        id={`${id}-target`}
        position={Position.Top}
        style={{ background: '#555' }}
      />
      <Handle
        id={`${id}-left`}
        type='source'
        position={Position.Bottom}
        style={{
          background: 'blue',
          left: '20%',
          width: '20px',
          height: '20px',
        }}
      />
      <Handle
        id={`${id}-right`}
        type='source'
        position={Position.Bottom}
        style={{
          background: 'red',
          left: '80%',
          width: '20px',
          height: '20px',
        }}
      />
    </>
  );
};

export default CustomNode;
