import { Handle, Position, useEdges } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/features/workflow-editor/types/task";
import NodeParamField from "@/features/workflow-editor/components/nodes/NodeParamField";
import { ColorForHandle } from "@/features/workflow-editor/constants";
import useFlowValidation from "@/features/workflow-editor/hooks/useFlowValidation";

interface NodeInputProps {
  input: TaskParam;
  nodeId: string;
}

export default function NodeInput({ input, nodeId }: NodeInputProps) {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some(
    edge => edge.target === nodeId && edge.targetHandle === input.name
  );
  const hasErrors = invalidInputs
    .find(node => node.nodeId === nodeId)
    ?.inputs.find(invalidInput => invalidInput === input.name);

  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasErrors && "bg-destructive/30"
      )}
    >
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
