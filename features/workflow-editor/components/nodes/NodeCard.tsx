"use client";

import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import useFlowValidation from "@/features/workflow-editor/hooks/useFlowValidation";

interface NodeCardProps {
  children: React.ReactNode;
  nodeId: string;
  isSelected?: boolean;
}

const NodeCard = ({ children, nodeId, isSelected }: NodeCardProps) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some(input => input.nodeId === nodeId);

  const centerOnNode = useCallback(() => {
    const node = getNode(nodeId);
    if (!node) return;

    const { position, measured } = node;
    if (!position || !measured) return;

    const { width, height } = measured;
    if (!width || !height) return;

    const x = position.x + width / 2;
    const y = position.y + height / 2;
    if (x === undefined || y === undefined) return;

    setCenter(x, y, {
      zoom: 1,
      duration: 500
    });
  }, [getNode, nodeId, setCenter]);

  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-background border-2" +
          " border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary",
        hasInvalidInputs && "border-destructive border-2"
      )}
      onDoubleClick={centerOnNode}
    >
      {children}
    </div>
  );
};
export default NodeCard;
