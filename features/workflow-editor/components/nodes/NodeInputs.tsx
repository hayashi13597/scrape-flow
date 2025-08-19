import React from "react";

interface NodeInputsProps {
  children: React.ReactNode;
}

export function NodeInputs({ children }: NodeInputsProps) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}
