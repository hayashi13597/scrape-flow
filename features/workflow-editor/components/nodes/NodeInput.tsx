import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/features/workflow-editor/types/task";
import NodeParamField from "@/features/workflow-editor/components/nodes/NodeParamField";

interface NodeInputProps {
  input: TaskParam;
  nodeId: string;
}

export function NodeInput({ input, nodeId }: NodeInputProps) {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
}
