"use client";

import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "@/features/workflow-editor/lib/createFlowNode";
import { TaskType } from "@/features/workflow-editor/types/task";
import { fitViewOptions, nodeTypes, snapGrid } from "../constants";

interface FlowEditorProps {
  workflow: Workflow;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FlowEditor = ({ workflow }: FlowEditorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState([
    createFlowNode(TaskType.LUNCH_BROWSER)
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};
export default FlowEditor;
