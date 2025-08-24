import { Node } from "@xyflow/react";
import type { TaskParam, TaskType } from "./task";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamProps: (newValue: string) => void;
  disabled?: boolean;
}
