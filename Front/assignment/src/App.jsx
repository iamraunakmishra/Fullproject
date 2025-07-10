import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow, // Import useReactFlow hook
} from 'reactflow';
import 'reactflow/dist/style.css';
import './index.css';

import { InputNode } from './nodes/InputNode.jsx';
import { OutputNode } from './nodes/OutputNode.jsx';
import { TextNode } from './nodes/TextNode.jsx';
import { Llmnode } from './nodes/Llmnode.jsx';
import { MergeNode } from './nodes/MergeNode.jsx';
import { SplitNode } from './nodes/SplitNode.jsx';
import { DataBaseNode } from './nodes/DataBaseNode.jsx';
import { ConditionalNode } from './nodes/ConditionalNode.jsx';
import { ApiNode } from './nodes/ApiNode.jsx';

import { submitPipeline } from './utils/submitPipeline.js'; // Import submitPipeline function

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: Llmnode,
  merge: MergeNode,
  split: SplitNode,
  database: DataBaseNode,
  conditional: ConditionalNode,
  api: ApiNode,
};

const initialNodes = [
  { id: 'input-1', type: 'input', position: { x: 100, y: 50 }, data: { label: 'Start Here' } },
  { id: 'text-1', type: 'text', position: { x: 100, y: 200 }, data: { text: 'Hello {{name}} from {{city}}!' } },
  { id: 'llm-1', type: 'llm', position: { x: 350, y: 150 }, data: { label: 'Process with LLM' } },
  { id: 'output-1', type: 'output', position: { x: 600, y: 50 }, data: { outputName: 'Final Result' } },
  { id: 'merge-1', type: 'merge', position: { x: 350, y: 350 }, data: {} },
  { id: 'split-1', type: 'split', position: { x: 100, y: 450 }, data: {} },
  { id: 'db-1', type: 'database', position: { x: 600, y: 250 }, data: {} },
  { id: 'cond-1', type: 'conditional', position: { x: 600, y: 450 }, data: {} },
  { id: 'api-1', type: 'api', position: { x: 350, y: 550 }, data: {} },
];

const initialEdges = [
  { id: 'e1-llm', source: 'input-1', target: 'llm-1', animated: true },
  { id: 'eText-llm', source: 'text-1', target: 'llm-1', animated: true },
  { id: 'ellm-out', source: 'llm-1', target: 'output-1', animated: true },
];

function FlowContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const { getNodes, getEdges } = useReactFlow();

  const handleSubmitPipeline = useCallback(async () => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    console.log('Nodes for submission:', currentNodes);
    console.log('Edges for submission:', currentEdges);

    try {
      const responseData = await submitPipeline(currentNodes, currentEdges);

      let alertMessage = "Pipeline submitted successfully!\n";
      alertMessage += `Nodes Processed: ${responseData.num_nodes}\n`;
      alertMessage += `Edges Processed: ${responseData.num_edges}\n`;
      alertMessage += `Is DAG: ${responseData.is_dag ? 'Yes' : 'No'}\n`;
      
      alert(alertMessage);

    } catch (error) {
      console.error("Failed to submit pipeline:", error);
      alert(`Error submitting pipeline: ${error.message || "An unknown error occurred."}`);
    }
  }, [getNodes, getEdges]);

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-gray-100">
      <div className="
        flex-none px-6 py-3
        bg-white shadow-md border-b border-gray-200
        flex justify-end items-center
      ">
        <button
          onClick={handleSubmitPipeline}
          className="
            bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            text-white font-semibold py-2.5 px-7 rounded-lg text-base
            transition-all duration-200 shadow-md transform hover:scale-105
          "
        >
          Submit Pipeline
        </button>
      </div>

      <div className="flex-grow relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="react-flow-canvas bg-gradient-to-br from-sky-200 to-pink-200"
        >
          <MiniMap
            nodeStrokeWidth={3}
            nodeColor={(n) => {
              if (n.type === 'input') return '#6EE7B7';
              if (n.type === 'output') return '#FB923C';
              if (n.type === 'llm') return '#818CF8';
              if (n.type === 'text') return '#FCD34D';
              if (n.type === 'merge') return '#93C5FD';
              if (n.type === 'split') return '#F472B6';
              if (n.type === 'database') return '#A78BFA';
              if (n.type === 'conditional') return '#FDA47A';
              if (n.type === 'api') return '#A3A3A3';
              return '#A5B4FC';
            }}
            zoomable
            pannable
            className="rounded-lg border border-gray-200 shadow-md mr-4 mb-4"
          />
          <Controls
            className="!bg-white !rounded-lg !shadow-md !border !border-gray-200 ml-4 mt-4"
          />
          <Background variant="dots" gap={12} size={1} color="#CBD5E0" />
        </ReactFlow>
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
}

export default App;
