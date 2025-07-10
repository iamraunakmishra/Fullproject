import React, { useState, useRef, useEffect, useCallback } from "react"; 
import { Handle , Position , useUpdateNodeInternals } from "reactflow";
import Backnode from "./Backnode.jsx";

const variable = /\{\{([a-zA-Z0-9_]+)\}\}/g;

export const TextNode = ({ id, data }) => {
 
  const [currText, setCurrText] = useState(data?.text || '');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [dynamicInputHandles, setDynamicInputHandles] = useState([]);

  const handleTextChange = useCallback((e)=> {
    setCurrText(e.target.value);
  },[]);

  useEffect(()=>{
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    updateNodeInternals(id); 
  },[currText, id, updateNodeInternals]); 

  useEffect(() => {
    const foundVariables = new Set();
    let match;
    variable.lastIndex = 0; 

    while((match = variable.exec(currText)) !== null) {
      foundVariables.add(match[1]);
    }

    let newHandles = Array.from(foundVariables).map((variableName) => ({
        id: `${id}-${variableName}`,
        position: Position.Left,
        type: 'target',
        label: variableName 
    }));

   
    if(newHandles.length === 0) {
      newHandles.push({
          id: `${id}-default-input`,
          position: Position.Left,
          type: 'target',
          label: 'input' 
      });
    }

    setDynamicInputHandles(newHandles);
    updateNodeInternals(id);

  }, [currText, id, updateNodeInternals]); 
  const outputHandles = [{ id: `${id}-output`, position: Position.Right }];

  return (
    <Backnode
      id={id}
      data={data}
      type="text"
      title="Text"
      inputHandles={dynamicInputHandles} 
      outputHandles={outputHandles} 
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className='nodrag w-full p-2 text-sm border border-gray-300 rounded-md
                     bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                     resize-none nodrag' 
          rows={1}
        />
      </label>
    </Backnode>
  );
};