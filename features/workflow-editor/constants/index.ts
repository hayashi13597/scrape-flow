import { TaskParamType } from "@/features/workflow-editor/types/task";

export const snapGrid: [number, number] = [50, 50];
export const fitViewOptions = {
  padding: 1
};

export const ColorForHandle = {
  [TaskParamType.BROWSER_INSTANCE]: "!bg-sky-300",
  [TaskParamType.STRING]: "!bg-amber-400"
} as const satisfies Record<TaskParamType, string>;
