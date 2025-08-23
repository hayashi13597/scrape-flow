import { TaskParamType, TaskType } from "@/features/workflow-editor/types/task";
import { GlobeIcon, LucideProps } from "lucide-react";
import { WorkflowTaskType } from "@/features/workflows/types";

export const LaunchBrowserTask = {
  type: TaskType.LUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamType.STRING,
      helperText: "eg: https://google.com",
      required: true,
      hideHandle: true
    }
  ],
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE
    }
  ]
} satisfies WorkflowTaskType;
