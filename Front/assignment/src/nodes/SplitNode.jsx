import React from "react";
import { Handle, Position } from "reactflow";
import Backnode from "./Backnode.jsx";

export const SplitNode = ({ id, data }) => {
    const inputHandles = [
        { id: `${id}-input`, position: Position.Left }
    ];
    
    const outputHandles = [
        { id: `${id}-output1`, position: Position.Right, style: { top: '33.33%' } },
        { id: `${id}-output2`, position: Position.Right, style: { top: '66.66%' } }
    ];
    
    return (
        <Backnode
        id={id}
        data={data}
        type="split"
        title="Split"
        inputHandles={inputHandles}
        outputHandles={outputHandles}
        >
        <span>This is Split Node</span>
        </Backnode>
    );
}