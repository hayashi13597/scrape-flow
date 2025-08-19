import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "@/features/workflow-editor/components/FlowEditor";

interface EditorProps {
  workflow: Workflow;
}

const Editor = ({ workflow }: EditorProps) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full overflow-hidden">
        <section className="flex h-full overflolw-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};
export default Editor;
