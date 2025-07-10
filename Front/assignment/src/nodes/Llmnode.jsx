import React from 'react'; 
import { Handle, Position } from 'reactflow'; 
import Backnode from './Backnode.jsx';

export const Llmnode = ({ id, data }) => {
    const inputHandles = [
       
        { id: `${id}-system`, position: Position.Left, style: { top: '33.33%' } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: '66.66%' } }
    ];
    const outputHandles = [
        { id: `${id}-response`, position: Position.Right }
    ];

    return(
       <Backnode
             id={id}
             data={data}
             type="llm" 
             title="LLM"
             inputHandles={inputHandles}
             outputHandles={outputHandles}
       >
       <span>This is LLM</span>
       </Backnode>
    );
};