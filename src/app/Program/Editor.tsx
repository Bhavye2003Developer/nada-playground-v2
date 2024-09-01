"use client";

import { useEffect, useRef, useState } from "react";
import ReactCodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { lintGutter } from "@codemirror/lint";
import useGlobals from "@/stores/useGlobals";
import useProgramCache from "@/stores/useProgramCache";
import { static_analysis } from "@/utils/static_analysis";
import "../../MyEditor.css";
import { buildPermalink } from "@/utils/helper";

function MyEditor({ messageHeight }: { messageHeight: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number | null>(0);

  const [
    isInputChanged,
    toggleInputChanged,
    updateOutput,
    reInitialiseInputs,
    code,
    setCode,
  ] = useProgramCache((state) => [
    state.isInputChanged,
    state.toggleInputChanged,
    state.updateOutput,
    state.reInitialiseInputs,
    state.code,
    state.setCode,
  ]);
  const [pyodide, isRunBtnClicked, resetRunBtnClicked] = useGlobals((state) => [
    state.pyodide,
    state.isRunBtnClicked,
    state.resetRunBtnClicked,
  ]);

  const codeChange = (code: string) => {
    setCode(code || "");
    buildPermalink();
  };

  useEffect(() => {
    if (divRef.current) {
      const height = divRef.current.offsetHeight;
      console.log("printing height: ", height);
      setDivHeight(height);
    }
  }, [messageHeight]);

  useEffect(() => {
    if (pyodide) {
      if (isRunBtnClicked) {
        const analysis = JSON.parse(pyodide.runPython(static_analysis(code)));
        console.log("complete analysis: ", analysis);

        reInitialiseInputs(analysis.inputs);
        updateOutput(analysis.output);

        resetRunBtnClicked();
      } else if (isInputChanged) {
        pyodide.runPython(static_analysis(code));
        console.log("Input has changed now...");
        toggleInputChanged();
      }
    }
  }, [
    isRunBtnClicked,
    isInputChanged,
    code,
    pyodide,
    reInitialiseInputs,
    updateOutput,
    resetRunBtnClicked,
    toggleInputChanged,
  ]);

  return (
    <div className="h-full w-full flex flex-col" ref={divRef}>
      <ReactCodeMirror
        value={code}
        className="flex-1 w-full overflow-auto p-1"
        extensions={[basicSetup(), python(), lintGutter()]}
        onChange={codeChange}
        theme="dark"
        style={{ maxHeight: divHeight ? `${divHeight}px` : "auto" }}
      />
    </div>
  );
}

export default MyEditor;
