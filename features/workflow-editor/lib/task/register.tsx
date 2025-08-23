import { LaunchBrowserTask } from "@/features/workflow-editor/lib/task/LaunchBrowser";
import { PageToHtmlTask } from "@/features/workflow-editor/lib/task/PageToHtml";
import { ExtractTextFromElementTask } from "@/features/workflow-editor/lib/task/ExtractTextFromElement";
import { TaskType } from "@/features/workflow-editor/types/task";
import { WorkflowTaskType } from "@/features/workflows/types";

type RegisterType = {
  [K in TaskType]: WorkflowTaskType & { type: K };
};

export const TaskRegistry: RegisterType = {
  LUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask
};
