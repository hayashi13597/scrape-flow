import { TaskRegistry } from "@/features/workflow-editor/lib/task/register";
import { TaskType } from "@/features/workflow-editor/types/task";
import { Button } from "@/components/ui/button";

interface TaskMenuBtnProps {
  taskType: TaskType;
}

const TaskMenuBtn = ({ taskType }: TaskMenuBtnProps) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (e: React.DragEvent, taskType: TaskType) => {
    e.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: taskType })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={e => onDragStart(e, taskType)}
    >
      <div className="flex items-center gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
};
export default TaskMenuBtn;
