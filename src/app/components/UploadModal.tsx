"use client";

import useGlobals from "@/stores/useGlobals";
import { useState } from "react";
import { fetchCodeFile } from "../actions/fetchFile";
import useProgramCache, { Inputs } from "@/stores/useProgramCache";
import { toast } from "react-toastify";
import YAML from "yaml";

const UploadModal = () => {
  const [toggleUploadBtn, lightThemeEnabled] = useGlobals((state) => [
    state.toggleUploadBtn,
    state.lightThemeEnabled,
  ]);
  const [setCode, overrideInputs] = useProgramCache((state) => [
    state.setCode,
    state.overrideInputs,
  ]);
  const [githubCodeURL, setGithubCodeURL] = useState("");
  const [githubInputsURL, setGithubInputsURL] = useState("");
  const [isUploadingCode, setIsUploadingCode] = useState(false);
  const [isUploadingInputs, setIsUploadingInputs] = useState(false);

  const validateProgramURL = (url: string): boolean => {
    try {
      const urlInst = new URL(url);
      return urlInst.hostname === "github.com" && urlInst.protocol === "https:";
    } catch (e) {
      console.error("Invalid URL: ", e);
      return false;
    }
  };

  const handleUpload = async (
    urlToBeUploaded: string,
    updater: (code: string) => void,
    fileType: string,
    setUploading: (uploading: boolean) => void
  ) => {
    if (validateProgramURL(urlToBeUploaded)) {
      try {
        setUploading(true);
        const response = await fetchCodeFile(urlToBeUploaded);
        setUploading(false);

        if (response.status === 200) {
          updater(response.data);
          toast.success(`${fileType} uploaded successfully`);
          // Clear input field after successful upload
          if (fileType === "Nada Program") {
            setGithubCodeURL("");
          } else {
            setGithubInputsURL("");
          }
        } else {
          toast.error(`${fileType} not found or GitHub URL is not valid`);
        }
      } catch (error) {
        setUploading(false);
        console.error("Error fetching file: ", error);
        toast.error("An error occurred during the upload. Please try again.");
      }
    } else {
      toast.error("GitHub URL is not valid");
    }
  };

  return (
    <div
      id="upload-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-opacity-50 ${
        lightThemeEnabled ? "bg-gray-200" : "bg-opacity-50"
      }`}
    >
      <div
        className={`relative w-full max-w-2xl p-6 rounded-lg shadow-lg ${
          lightThemeEnabled
            ? "bg-white text-gray-900"
            : "bg-gray-800 text-white"
        }`}
      >
        <div
          className={`flex items-center justify-between pb-4 mb-4 border-b ${
            lightThemeEnabled ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <h3 className="text-xl font-bold">
            Upload Your Nada Program and Inputs File
          </h3>
          <button
            type="button"
            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${
              lightThemeEnabled
                ? "text-gray-500 bg-transparent hover:text-gray-900 hover:bg-gray-200"
                : "text-gray-500 bg-transparent hover:text-white hover:bg-gray-700"
            }`}
            onClick={toggleUploadBtn}
            aria-label="Close modal"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex">
            <input
              type="url"
              className={`w-full p-2 text-base border rounded-l-md ${
                lightThemeEnabled
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-white"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nada Program file URL"
              value={githubCodeURL}
              onChange={(e) => setGithubCodeURL(e.target.value)}
            />
            <button
              className="px-4 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() =>
                handleUpload(
                  githubCodeURL,
                  setCode,
                  "Nada Program",
                  setIsUploadingCode
                )
              }
              disabled={isUploadingCode || isUploadingInputs}
            >
              {isUploadingCode ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="flex">
            <input
              type="url"
              className={`w-full p-2 text-base border rounded-l-md ${
                lightThemeEnabled
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-white"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nada Inputs file URL"
              value={githubInputsURL}
              onChange={(e) => setGithubInputsURL(e.target.value)}
            />
            <button
              className="px-4 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() =>
                handleUpload(
                  githubInputsURL,
                  (yamlCode: string) => {
                    try {
                      const parsed = YAML.parse(yamlCode);
                      if (parsed.inputs) {
                        const newInputs: Inputs = Object.fromEntries(
                          Object.entries(parsed.inputs).map(([key, value]) => [
                            key,
                            { value, type: "" },
                          ])
                        );
                        overrideInputs(newInputs);
                        toast.success("Nada Inputs uploaded successfully");
                        setGithubInputsURL(""); // Clear input field after successful upload
                      } else {
                        toast.error("Nada Inputs not valid");
                      }
                    } catch (e) {
                      console.error("YAML parsing error: ", e);
                      toast.error("YAML is not valid");
                    }
                  },
                  "Nada Inputs",
                  setIsUploadingInputs
                )
              }
              disabled={isUploadingCode || isUploadingInputs}
            >
              {isUploadingInputs ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
