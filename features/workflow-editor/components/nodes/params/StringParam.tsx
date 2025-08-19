"use client";

import React, { useEffect, useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ParamProps } from "@/features/workflow-editor/types/appNode";

const StringParam = ({ param, value, updateNodeParamProps }: ParamProps) => {
  const [internalValue, setInternalValue] = useState<string>(value ?? "");
  const id = useId();

  useEffect(() => {
    setInternalValue(value ?? "");
  }, [value]);

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex gap-1">
        {param.name}
        {param.required && <p className="text-red-400">*</p>}
      </Label>
      <Input
        id={id}
        className="bg-white text-xs"
        placeholder="Enter value here"
        value={internalValue}
        onChange={e => setInternalValue(e.target.value)}
        onBlur={e => updateNodeParamProps(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
};
export default StringParam;
