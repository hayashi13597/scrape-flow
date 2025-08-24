import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "@/features/workflow-editor/components/FlowEditor";
import Topbar from "@/features/workflow-editor/components/topbar";
import TaskMenu from "@/features/workflow-editor/components/menu/TaskMenu";
import FlowValidationContextProvider from "@/contexts/FlowValidationContext";

interface EditorProps {
  workflow: Workflow;
}

const Editor = ({ workflow }: EditorProps) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full overflow-hidden">
          <Topbar
            title="Workflow Editor"
            subTitle={workflow.name}
            workflowId={workflow.id}
          />
          <section className="flex h-full overflolw-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};
export default Editor;
