import { ParamProps } from "@/features/workflow-editor/types/appNode";

const BrowserInstanceParam = ({ param }: ParamProps) => {
  return <p className="text-xs">{param.name}</p>;
};
export default BrowserInstanceParam;
