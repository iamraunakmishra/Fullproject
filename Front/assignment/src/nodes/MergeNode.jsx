import React from "react";
import { Handle, Position } from "reactflow";
import Backnode from "./Backnode.jsx";

export const MergeNode = ({ id, data }) => {
    const inputHandles = [
        { id: `${id}-input1`, position: Position.Left, style: { top: '33.33%' } },
        { id: `${id}-input2`, position: Position.Left, style: { top: '66.66%' } }
    ];
    const outputHandles = [
        { id: `${id}-output`, position: Position.Right }
    ];
    
    return (
        <Backnode
        id={id}
        data={data}
        type="merge"
        title="Merge"
        inputHandles={inputHandles}
        outputHandles={outputHandles}
        >
        <span>This is Merge Node</span>
        </Backnode>
    );
}