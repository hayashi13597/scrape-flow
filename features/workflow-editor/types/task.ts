import React from "react";
import { LucideProps } from "lucide-react";
import type { AppNode } from "@/features/workflow-editor/types/appNode";

export enum TaskType {
  LUNCH_BROWSER = "LUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT"
}

export enum TaskParamType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE"
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type WorkflowTaskType = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];
