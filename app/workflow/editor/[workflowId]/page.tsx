import { getWorkflowById } from "@/features/workflow-editor/services/getWorkflowById";
import Editor from "@/features/workflow-editor/components/Editor";

interface WorkflowEditorProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const WorkflowEditor = async ({ params }: WorkflowEditorProps) => {
  const { workflowId } = await params;

  const workflow = await getWorkflowById(workflowId);

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
};
export default WorkflowEditor;
