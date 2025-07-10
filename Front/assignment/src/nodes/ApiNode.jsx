import React from "react";
import { Handle, Position } from "reactflow";
import Backnode from "./Backnode.jsx";

export const ApiNode = ({ id, data }) => {
    const inputHandles = [
        { id: `${id}-input`, position: Position.Left }
    ];

    const outputHandles = [
        { id: `${id}-output`, position: Position.Right }
    ];

    return (
        <Backnode
            id={id}
            data={data}
            type="api"
            title="API"
            inputHandles={inputHandles}
            outputHandles={outputHandles}
        >
            <span>This is API Node</span>
        </Backnode>
    );
}