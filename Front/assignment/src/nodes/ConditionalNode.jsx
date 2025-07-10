import React from "react";
import { Handle, Position } from "reactflow";
import Backnode from "./Backnode.jsx";

export const ConditionalNode = ({ id, data }) => {
    const inputHandles = [
        { id: `${id}-input`, position: Position.Left }
    ];
    
    const outputHandles = [
        { id: `${id}-true`, position: Position.Right, style: { top: '33.33%' } },
        { id: `${id}-false`, position: Position.Right, style: { top: '66.66%' } }
    ];
    
    return (
        <Backnode
        id={id}
        data={data}
        type="conditional"
        title="Conditional"
        inputHandles={inputHandles}
        outputHandles={outputHandles}
        >
        <span>This is Conditional Node</span>
        </Backnode>
    );
}