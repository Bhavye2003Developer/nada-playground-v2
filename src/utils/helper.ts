import { toast } from "react-toastify";
import useGlobals from "../stores/useGlobals";
import useProgramCache from "../stores/useProgramCache";
import examples from "./CodeExamples";
import Interpreter, { InsType, outsType } from "./Interpreter";
import Report from "./Report";
import getBaseLink from "./getBaseLink";

const report = new Report();
const interpreter = new Interpreter();

const setCode = useProgramCache.getState().setCode;
const addNewMessage = useProgramCache.getState().addNewMessage;

export function reportDisplay(rlines: string[]) {
  report.display(rlines);
}

export function interpreterInputsRetrieve() {
  return interpreter.inputsRetrieve();
}

export function interpreterInputsShow(ins: InsType) {
  console.log("inputs showing...", ins);
  return interpreter.inputsShow(ins);
}

export function interpreterOutputsShow(outs: outsType) {
  return interpreter.outputsShow(outs);
}

export async function buildPermalink() {
  console.log("buildPermalink called");
  const code = useProgramCache.getState().code.trim();
  const updateSharedLink = useGlobals.getState().updateSharedLink;

  if (code == "") {
    updateSharedLink(getBaseLink());
    return;
  }

  const isCodeExisted = examples.some((example) => {
    return code == example.code.trim();
  });
  if (isCodeExisted) {
    updateSharedLink(getBaseLink());
    return;
  }

  // Based on example at:
  // https://dev.to/samternent/json-compression-in-the-browser-with-gzip-and-the-compression-streams-api-4135
  const stream = new Blob([code], {
    type: "text/plain",
  }).stream();
  const compressedReadableStream = stream.pipeThrough(
    new CompressionStream("gzip")
  );
  const compressedResponse = new Response(compressedReadableStream);
  const blob = await compressedResponse.blob();
  const buffer = await blob.arrayBuffer();
  const compressedBase64 = encodeURIComponent(
    btoa(String.fromCharCode(...new Uint8Array(buffer)))
  );
  const link = getBaseLink() + "?shared=" + compressedBase64;

  console.log("link: ", link);
  updateSharedLink(link);
}

function b64decode(str: string) {
  const binary_string = window.atob(str);
  const len = binary_string.length;
  const bytes = new Uint8Array(new ArrayBuffer(len));
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

export async function fetchCode(sharedValue: string) {
  if (sharedValue.trim()) {
    console.log("entered");

    const compressed = b64decode(decodeURIComponent(sharedValue));
    const stream = new Blob([compressed], { type: "text/plain" }).stream();
    const compressedReadableStream = stream.pipeThrough(
      new DecompressionStream("gzip")
    );
    const resp = new Response(compressedReadableStream);
    try {
      const blob = await resp.blob();
      const value = await blob.text();
      setCode(value);
    } catch (err) {
      toast.warn("The shared URL doesn't exists");
      setCode("");
    }
  }
}

export function sendMessage(message: string) {
  console.log("cur message: ", JSON.parse(message));
  addNewMessage(JSON.parse(message));
}