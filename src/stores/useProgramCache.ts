import { create } from "zustand";
import examples from "../utils/CodeExamples";

type Inputs = {
  [name: string]: {
    value: any;
    type: string;
  };
};

export type Output = {
  name: string;
  value: any;
};

interface PorgramState {
  code: string;
  inputs: Inputs;
  output: Output[];
  messages: string[][];
  isInputChanged: boolean;
  reInitialiseInputs: (updatedInputs: Inputs) => void;
  updateValue: (inputName: string, value: any) => void;
  toggleInputChanged: () => void;
  updateOutput: (updatedOutput: Output[]) => void;
  setCode: (updatedCode: string) => void;
  resetProgram: () => void;
  addNewMessage: (message: string[]) => void;
  resetMessages: () => void;
}

const useProgramCache = create<PorgramState>()((set, get) => ({
  code: examples[0].code,
  inputs: {},
  output: [],
  messages: [],
  isInputChanged: false,
  reInitialiseInputs: (updatedInputs) =>
    set((state) => ({
      ...state,
      inputs: updatedInputs,
    })),
  // updateInputValue
  updateValue: (inputName, value) => {
    const inputElements = get().inputs;
    set((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        [inputName]: {
          value: value,
          type: inputElements[inputName].type,
        },
      },
    }));
  },
  toggleInputChanged: () => {
    set((state) => ({
      ...state,
      isInputChanged: !get().isInputChanged,
    }));
  },

  updateOutput: (updatedOutput) => {
    console.log("output of updatedOutput: ", updatedOutput);
    set((state) => ({
      ...state,
      output: updatedOutput,
    }));
  },

  setCode: (updatedCode: string) => {
    set((state) => ({
      ...state,
      code: updatedCode,
    }));
  },

  resetProgram: () => {
    set(() => ({
      code: "",
      inputs: {},
      output: [],
      messages: [],
    }));
  },

  addNewMessage: (message: string[]) => {
    const messages = [...get().messages];
    messages.push(message);
    set((state) => ({ ...state, messages: messages }));
  },

  resetMessages: () => {
    console.log("resetting messages");
    set((state) => ({ ...state, messages: [] }));
  },
}));

export default useProgramCache;
