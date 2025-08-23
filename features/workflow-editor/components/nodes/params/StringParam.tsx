"use client";

import React, { useCallback, useEffect, useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ParamProps } from "@/features/workflow-editor/types/appNode";
import { Textarea } from "@/components/ui/textarea";

const StringParam = ({
  param,
  value,
  updateNodeParamProps,
  disabled
}: ParamProps) => {
  const [internalValue, setInternalValue] = useState<string>(value ?? "");
  const id = useId();

  useEffect(() => {
    setInternalValue(value ?? "");
  }, [value]);

  const Component = param.variant === "textarea" ? Textarea : Input;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateNodeParamProps(e.target.value);
    },
    [updateNodeParamProps]
  );

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex gap-1">
        {param.name}
        {param.required && <p className="text-red-400">*</p>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        className="bg-white text-xs"
        placeholder="Enter value here"
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {param.helperText && (
        <p className="text-muted-foreground text-xs px-2">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
