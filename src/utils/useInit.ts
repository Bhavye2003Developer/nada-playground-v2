"use client";

import { InsType, outsType } from "./Interpreter";
import {
  interpreterInputsRetrieve,
  interpreterInputsShow,
  interpreterOutputsShow,
  reportDisplay,
  sendMessage,
} from "./helper";
import useGlobals, { InitializationState } from "../stores/useGlobals";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useScript } from "usehooks-ts";
import wasmInitialiser from "./nada_run";

const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

declare global {
  interface Window {
    reportDisplay: (rlines: string[]) => void;
    interpreterInputsRetrieve: () => {
      [name: string]: string | number[];
    };
    interpreterInputsShow: (ins: InsType) => string;
    interpreterOutputsShow: (outs: outsType) => {
      name: string;
      value: number;
    }[];
    sendMessage: (message: string) => void;
  }
}

function initWindowProperties() {
  window.reportDisplay = reportDisplay;
  window.interpreterInputsRetrieve = interpreterInputsRetrieve;
  window.interpreterInputsShow = interpreterInputsShow;
  window.interpreterOutputsShow = interpreterOutputsShow;
  window.sendMessage = sendMessage;
}

const PYODIDE_VERSION = "0.26.2";

async function useInit() {
  const pyodideScriptStatus = useScript(
    `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`
  );
  const [updateInitializationState, initialisePyodide, initialiseWasm] =
    useGlobals((state) => [
      state.updateInitializationState,
      state.initialisePyodide,
      state.initialiseWasm,
    ]);

  useEffect(() => {
    const initializePyodide = async () => {
      const pyodide = await (window as any).loadPyodide({
        indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full`,
      });
      console.log(pyodide.version);

      updateInitializationState(InitializationState.InitializingPyodide);
      console.log("init: ", pyodide);
      updateInitializationState(InitializationState.PyodideInitialized);
      await pyodide.loadPackage("micropip");
      const micropip = pyodide.pyimport("micropip");
      updateInitializationState(InitializationState.InstallingPackages);
      await micropip.install(
        "https://files.pythonhosted.org/packages/a8/94/7d468bcd22d491db6c0651188278a8790fba5951784e03c618cba55f97bc/parsial-0.1.0-py3-none-any.whl"
      );
      await micropip.install(
        "https://files.pythonhosted.org/packages/bb/e5/6d9baab97743fab7c168d3ee330ebc1b3d6c90df37469a5ce4e3fa90f811/richreports-0.2.0-py3-none-any.whl"
      );
      await micropip.install(
        "https://files.pythonhosted.org/packages/45/86/4736ac618d82a20d87d2f92ae19441ebc7ac9e7a581d7e58bbe79233b24a/asttokens-2.4.1-py2.py3-none-any.whl"
      );
      await micropip.install("nada_audit-0.0.0-py3-none-any.whl");
      await micropip.install("nada_dsl-0.1.0-py3-none-any.whl");
      initWindowProperties();
      updateInitializationState(InitializationState.Initializing);
      initialisePyodide(pyodide);

      // initialise wasm
      const wasm = await wasmInitialiser();
      initialiseWasm(wasm);

      await delay(700);
      updateInitializationState(InitializationState.Completed);
      toast.success("Initialisation completed");

      console.log("setup completed");
    };

    if (pyodideScriptStatus === "ready") {
      console.log("start init");
      initializePyodide();
    }
  }, [pyodideScriptStatus]);
}

export default useInit;
