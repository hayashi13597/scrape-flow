import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import NodeCard from "@/features/workflow-editor/components/nodes/NodeCard";
import NodeHeader from "@/features/workflow-editor/components/nodes/NodeHeader";
import { AppNodeData } from "@/features/workflow-editor/types/appNode";
import { TaskRegistry } from "@/features/workflow-editor/lib/task/register";
import { NodeInputs } from "@/features/workflow-editor/components/nodes/NodeInputs";
import NodeInput from "@/features/workflow-editor/components/nodes/NodeInput";
import NodeOutput from "@/features/workflow-editor/components/nodes/NodeOutput";
import NodeOutputs from "@/features/workflow-editor/components/nodes/NodeOutputs";
import { Badge } from "@/components/ui/badge";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {DEV_MODE && <Badge>DEV: {props.id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <NodeInputs>
        {task.inputs.map((input, index) => (
          <NodeInput key={index} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>

      <NodeOutputs>
        {task.outputs.map((output, index) => (
          <NodeOutput key={index} output={output} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
