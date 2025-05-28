import { Handle, Position, type NodeProps } from 'reactflow';

const LoopNode = ({ id, data }: NodeProps) => {
  //   const { dispatch } = useWorkflow();
  return (
    <>
      <div
        style={{
          padding: '10px',
          background: '#fff',
          borderRadius: '5px',
          border: '1px solid #222',
          color: '#222',
          textAlign: 'center',
          width: '200px',
        }}>
        {id}
        <p>{data.label}</p>
        Regular Node
      </div>
      <Handle
        id={id}
        type='target'
        position={Position.Top}
        style={{
          background: 'green',
          width: '20px',
          height: '20px',
        }}
      />
      <Handle
        id={id}
        type='source'
        position={Position.Bottom}
        style={{
          background: 'red',
          width: '20px',
          height: '20px',
          left: '20%',
        }}
      />
      <Handle
        id={`${id}-start`}
        type='source'
        position={Position.Right}
        style={{
          background: 'red',
          width: '20px',
          height: '20px',
          top: '30%',
        }}
      />
      <Handle
        id={`${id}-end`}
        type='target'
        position={Position.Bottom}
        style={{
          background: 'blue',
          width: '20px',
          height: '20px',
          left: '80%',
        }}
      />
    </>
  );
};

export default LoopNode;
