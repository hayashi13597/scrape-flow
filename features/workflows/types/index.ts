import React from "react";
import { LucideProps } from "lucide-react";
import { TaskParam, TaskType } from "@/features/workflow-editor/types/task";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED"
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
