import { Handle, Position, type NodeProps } from 'reactflow';

const LoopNode = ({ id, data }: NodeProps) => {
  //   const { dispatch } = useWorkflow();
  console.log(data._elkPorts);

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
        {/* <pre>{JSON.stringify({ x: data._elkPorts }, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify({ id }, null, 2)}</pre> */}
      </div>
      <Handle
        id={`${id}-target`}
        type='target'
        position={Position.Top}
        style={{
          background: 'green',
          width: '20px',
          height: '20px',
        }}
      />
      <Handle
        id={`${id}-source`}
        type='source'
        position={Position.Bottom}
        style={{
          background: 'yellow',
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
          background: 'purple',
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
