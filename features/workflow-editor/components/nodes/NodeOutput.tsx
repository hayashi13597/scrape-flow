import { TaskParam } from "@/features/workflow-editor/types/task";
import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { ColorForHandle } from "@/features/workflow-editor/constants";

interface NodeOutputProps {
  output: TaskParam;
}

const NodeOutput = ({ output }: NodeOutputProps) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-sx text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background" +
            " !-right-2 !w-4 !h-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
};
export default NodeOutput;
