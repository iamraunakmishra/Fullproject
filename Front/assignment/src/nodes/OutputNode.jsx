import React , {useState} from 'react';
import { Handle, Position } from 'reactflow';
import Backnode from './Backnode.jsx';

export const OutputNode = ({ id, data }) => {
    const[currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
    const [outputType, setOutputType] = useState(data.outputType || 'Text');
    const handleNameChange=(e)=>{
        setCurrName(e.target.value);
    }
    const handleTypeChange=(e)=>{
        setOutputType(e.target.value);
    }
    const inputHandles = [
        { id: `${id}-value`, position: Position.Left }
    ];
    const outputHandles = [];
    return(
        <Backnode
      id={id}
      data={data}
      type="output"
      title="Output"
      inputHandles={inputHandles }
      outputHandles={outputHandles}
    >
           
        <label>
            Name:
            <input 
              type="text" 
            value={currName} 
            onChange={handleNameChange}
            className='nodrag'
            />
        </label>
        <label>
            Type:
          <select value={outputType} onChange={handleTypeChange} className='nodrag'>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>

    </Backnode>
 )
};
    