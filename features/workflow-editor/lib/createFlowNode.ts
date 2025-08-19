import { TaskType } from "@/features/workflow-editor/types/task";
import { AppNode } from "@/features/workflow-editor/types/appNode";

export function createFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "Node",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {}
    },
    position: position ?? { x: 0, y: 0 }
  };
}
