import { Handle, Position, type NodeProps } from 'reactflow';

const RegularNode = ({ id, data }: NodeProps) => {
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
          backgroundColor: id === '10' || id === '24' ? 'lightblue' : '#fff',
        }}>
        {id}
        <p>{data.label}</p>
        Regular
        {/* <pre>{JSON.stringify({ x: data._elkPorts }, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify({ id }, null, 2)}</pre> */}
      </div>
      <Handle
        id={`${id}-regulon-target`}
        type='target'
        position={Position.Top}
        style={{
          background: 'blue',
          width: '20px',
          height: '20px',
        }}
      />
      <Handle
        id={`${id}-regulon-source`}
        type='source'
        position={Position.Bottom}
        style={{
          background: 'red',
          width: '20px',
          height: '20px',
        }}
      />
    </>
  );
};

export default RegularNode;
