"use client";

import { useEffect } from "react";
import CodeShareBtn from "./CodeShareBtn";
import useGlobals from "@/stores/useGlobals";
import useProgramCache from "@/stores/useProgramCache";
import examples from "@/utils/CodeExamples";

function Header() {
  const [runBtnClicked, isRunBtnClicked, toggleUploadBtn] = useGlobals(
    (state) => [
      state.runBtnClicked,
      state.isRunBtnClicked,
      state.toggleUploadBtn,
    ]
  );
  const [resetProgram, setCode, resetMessages] = useProgramCache((state) => [
    state.resetProgram,
    state.setCode,
    state.resetMessages,
  ]);

  const [toggleTheme, lightThemeEnabled] = useGlobals((state) => [
    state.toggleTheme,
    state.lightThemeEnabled,
  ]);

  return (
    <header
      className={`flex items-center justify-between px-4 ${
        lightThemeEnabled
          ? "bg-gray-50 border-gray-300"
          : "bg-gray-900 border-gray-700"
      } border-b shadow-sm`}
    >
      <div className="flex items-center space-x-4">
        <a href="https://docs.nillion.com/" target="_blank">
          <img
            src={lightThemeEnabled ? "./logo_light.svg" : "./logo.svg"}
            alt="Nillion"
            className="h-16 w-16"
          />
        </a>
      </div>

      <div className="flex items-center space-x-4">
        <select
          className={`px-4 py-2 text-sm font-medium ${
            lightThemeEnabled
              ? "text-gray-700 bg-white border-gray-300"
              : "text-gray-300 bg-gray-800 border-gray-600"
          } rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500`}
          onChange={(e) => {
            const code = e.target.value;
            setCode(code);
          }}
        >
          {examples.map((example) => (
            <option value={example.code} key={example.name}>
              {example.name}
            </option>
          ))}
        </select>
        <CodeShareBtn />
        <button
          onClick={toggleUploadBtn}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded shadow hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          UPLOAD
        </button>
        <button
          onClick={() => {
            runBtnClicked();
            resetMessages();
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {isRunBtnClicked ? "Executing..." : "RUN"}
        </button>
        <button
          onClick={resetProgram}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          RESET
        </button>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 text-sm font-medium ${
            lightThemeEnabled
              ? "text-gray-700 bg-gray-200 hover:bg-gray-300"
              : "text-gray-300 bg-gray-800 hover:bg-gray-700"
          } rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {lightThemeEnabled ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;
