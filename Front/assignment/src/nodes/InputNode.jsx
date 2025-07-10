import React,{ useState } from 'react';
import { Handle, Position } from 'reactflow';
import Backnode from './Backnode.jsx';
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };
  const inputHandles=[];
  const outputHandles=[{
    id: `${id}-value`,
    position: Position.Right,
  }]

  return (
    <Backnode
       id={id}
       data={data}
       type="input"
       title="Input"
       inputHandles={inputHandles}
      outputHandles={outputHandles}
    >
        <label>
            Name:
            <input 
                type="text"
                value={currName}
                onChange={handleNameChange}
                className="nodrag"
                />
        </label>
        <label>
            Type:
            <select
            value={inputType}
          onChange={handleTypeChange}
          className="nodrag">
           <option value="Text">Text</option>
          <option value="File">File</option>
        </select>  
        </label>
    </Backnode>
  );
}