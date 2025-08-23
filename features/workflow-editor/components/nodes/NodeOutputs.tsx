import React from "react";

interface NodeOutputsProps {
  children: React.ReactNode;
}
const NodeOutputs = ({ children }: NodeOutputsProps) => {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
};
export default NodeOutputs;
