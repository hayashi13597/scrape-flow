"use client";

import React, { useCallback } from "react";
import {
  TaskParam,
  TaskParamType
} from "@/features/workflow-editor/types/task";
import StringParam from "@/features/workflow-editor/components/nodes/params/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/features/workflow-editor/types/appNode";
import BrowserInstanceParam from "@/features/workflow-editor/components/nodes/params/BrowserInstanceParam";

interface NodeParamFieldProps {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
}

const NodeParamField = ({ param, nodeId, disabled }: NodeParamFieldProps) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue
        }
      });
    },
    [nodeId, node?.data.inputs, updateNodeData, param.name]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamProps={updateNodeParamValue}
          disabled={disabled}
        />
      );

    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value=""
          updateNodeParamProps={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};
export default NodeParamField;
