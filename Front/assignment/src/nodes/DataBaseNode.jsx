import React from "react";
import { Handle, Position } from "reactflow";
import Backnode from "./Backnode.jsx";

export const DataBaseNode = ({ id, data }) => {
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
            type="database"
            title="Database"
            inputHandles={inputHandles}
            outputHandles={outputHandles}
        >
            <span>This is Database Node</span>
        </Backnode>
    );
}