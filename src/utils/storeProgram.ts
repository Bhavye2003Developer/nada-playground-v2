import useGlobals from "@/stores/useGlobals";
import useProgramCache from "@/stores/useProgramCache";
import { program_to_bin } from "./nada_run";

const compileProgram = (program_code: string) => {
  const pyodide = useGlobals.getState().pyodide;
  const updated_code = program_code.replace("nada_audit", "nada_dsl");
  let program_json = pyodide.runPython(
    updated_code + "\n" + "nada_compile(nada_main())"
  );
  console.log("The program_json: ", program_json)
  return program_json;
};

const getProgramBinary = () => {
  const code = useProgramCache.getState().code;
  const wasm = useGlobals.getState().wasm;
  const program_json = compileProgram(code);
  const programBin = program_to_bin(program_json, wasm);
  return programBin;
};

const storeProgram = () => {
  const programBin = getProgramBinary();
  console.log("inside storeprogram: ", programBin);
};

export { compileProgram };
export default storeProgram;
