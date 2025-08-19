"use client";

import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";

interface NodeCardProps {
  children: React.ReactNode;
  nodeId: string;
  isSelected?: boolean;
}

const NodeCard = ({ children, nodeId, isSelected }: NodeCardProps) => {
  const { getNode, setCenter } = useReactFlow();

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
        isSelected && "border-primary"
      )}
      onDoubleClick={centerOnNode}
    >
      {children}
    </div>
  );
};
export default NodeCard;
