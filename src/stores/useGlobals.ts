import getBaseLink from "@/utils/getBaseLink";
import { create } from "zustand";

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
  storeProgramBtnClicked: Boolean;
  sharedLink: string;
  initalizationState: InitializationState;
  isUploadBtnClicked: Boolean;
  lightThemeEnabled: Boolean;
  initialisePyodide: (pyodidie_obj: any) => void;
  initialiseWasm: (wasm_obj: any) => void;
  runBtnClicked: () => void;
  resetRunBtnClicked: () => void;
  updateSharedLink: (updatedLink: string) => void;
  updateInitializationState: (updatedState: InitializationState) => void;
  toggleStoreProgramBtn: () => void;
  toggleUploadBtn: () => void;
  toggleTheme: () => void;
}

const useGlobals = create<globalTypes>()((set, get) => ({
  pyodide: null,
  wasm: null,
  isRunBtnClicked: false,
  storeProgramBtnClicked: false,
  isUploadBtnClicked: false,
  lightThemeEnabled: true,
  sharedLink: getBaseLink(),
  initalizationState: InitializationState.InitializingPyodide,
  initialisePyodide: (pyodide_obj) => {
    set((state) => ({ ...state, pyodide: pyodide_obj }));
  },
  initialiseWasm: (wasm_obj) => {
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
  toggleStoreProgramBtn: () => {
    const btnClicked = get().storeProgramBtnClicked;
    set((state) => ({ ...state, storeProgramBtnClicked: !btnClicked }));
  },
  toggleUploadBtn: () => {
    const btnClicked = get().isUploadBtnClicked;
    set((state) => ({ ...state, isUploadBtnClicked: !btnClicked }));
  },
  toggleTheme: () => {
    const theme = get().lightThemeEnabled;
    set((state) => ({ ...state, lightThemeEnabled: !theme }));
  },
}));

export default useGlobals;
