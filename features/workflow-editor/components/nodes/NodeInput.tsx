import { Handle, Position, useEdges } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/features/workflow-editor/types/task";
import NodeParamField from "@/features/workflow-editor/components/nodes/NodeParamField";
import { ColorForHandle } from "@/features/workflow-editor/constants";

interface NodeInputProps {
  input: TaskParam;
  nodeId: string;
}

export default function NodeInput({ input, nodeId }: NodeInputProps) {
  const edges = useEdges();
  const isConnected = edges.some(
    edge => edge.target === nodeId && edge.targetHandle === input.name
  );

  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4" +
              " !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
