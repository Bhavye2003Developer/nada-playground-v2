import { create } from "zustand";
import { getBaseLink } from "../utils/helper";

export enum InitializationState {
  InitializingPyodide = "Initializing Pyodide...",
  PyodideInitialized = "Pyodide initialized",
  InstallingPackages = "Installing Packages...",
  Initializing = "Initializing...",
  Completed = "Completed",
}
interface globalTypes {
  pyodide: any | null;
  wasm: any | null;
  isRunBtnClicked: boolean;
  sharedLink: string;
  initalizationState: InitializationState;
  initialisePyodide: (pyodidie_obj: any) => void;
  initialiseWasm: (wasm_obj: any) => void;
  runBtnClicked: () => void;
  resetRunBtnClicked: () => void;
  updateSharedLink: (updatedLink: string) => void;
  updateInitializationState: (updatedState: InitializationState) => void;
}

const useGlobals = create<globalTypes>()((set) => ({
  pyodide: null,
  wasm: null,
  isRunBtnClicked: false,
  sharedLink: getBaseLink(),
  initalizationState: InitializationState.InitializingPyodide,
  initialisePyodide: (pyodide_obj) => {
    console.log("getting obj: ", pyodide_obj);
    set((state) => ({ ...state, pyodide: pyodide_obj }));
  },
  initialiseWasm: (wasm_obj) => {
    console.log("getting wasm obj: ", wasm_obj);
    set((state) => ({ ...state, wasm: wasm_obj }));
  },
  runBtnClicked: () => {
    set((state) => ({ ...state, isRunBtnClicked: true }));
  },

  resetRunBtnClicked: () => {
    set((state) => ({ ...state, isRunBtnClicked: false }));
  },
  updateSharedLink: (updatedLink: string) => {
    set((state) => ({ ...state, sharedLink: updatedLink }));
  },
  updateInitializationState: (updatedState: InitializationState) => {
    set((state) => ({ ...state, initalizationState: updatedState }));
  },
}));

export default useGlobals;
