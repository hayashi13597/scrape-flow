"use client";

import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { fitViewOptions, snapGrid } from "../constants";
import React, { useCallback, useEffect } from "react";
import { createFlowNode } from "@/features/workflow-editor/lib/createFlowNode";
import { TaskType } from "@/features/workflow-editor/types/task";
import { AppNode } from "@/features/workflow-editor/types/appNode";
import DeletableEdge from "@/features/workflow-editor/components/edges/DeletableEdge";
import NodeComponent from "@/features/workflow-editor/components/nodes/NodeComponent";
import { TaskRegistry } from "@/features/workflow-editor/lib/task/register";

interface FlowEditorProps {
  workflow: Workflow;
}

const edgeTypes = {
  default: DeletableEdge
};

const nodeTypes = {
  Node: NodeComponent
};

const FlowEditor = ({ workflow }: FlowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {
      console.error("Error parsing workflow definition:", error);
    }
  }, [workflow.definition, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const payloadRaw = event.dataTransfer.getData("application/reactflow");
      if (!payloadRaw) return;
      let payload: { type?: TaskType };
      try {
        payload = JSON.parse(payloadRaw);
      } catch {
        return;
      }
      if (!payload?.type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });
      if (!position) return;

      const newNode = createFlowNode(payload.type as TaskType, position);
      setNodes(prevNodes => prevNodes.concat([newNode]));
    },
    [setNodes, screenToFlowPosition]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(eds => addEdge({ ...connection, animated: true }, eds));
      if (!connection.targetHandle) return;
      //   Remove input value if is present on the connection
      const node = nodes.find(nd => nd.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      delete nodeInputs[connection.targetHandle];
      updateNodeData(node.id, {
        inputs: { nodeInputs }
      });
    },
    [setEdges, nodes, updateNodeData]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No self-connection allowed
      if (connection.source === connection.target) return false;

      // Same taskParam type connection
      const source = nodes.find(nd => nd.id === connection.source);
      const target = nodes.find(nd => nd.id === connection.target);
      if (!source || !target) return false;

      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[target.data.type];

      const output = sourceTask.outputs.find(
        o => o.name === connection.sourceHandle
      );

      const input = targetTask.inputs.find(
        i => i.name === connection.targetHandle
      );

      if (input?.type !== output?.type) return false;

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycle = hasCycle(target);

      return !detectedCycle;
    },
    [nodes, edges]
  );

  return (
    <main className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};
export default FlowEditor;
