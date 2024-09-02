"use client";

import { useEffect } from "react";
import CodeShareBtn from "./CodeShareBtn";
import useGlobals from "@/stores/useGlobals";
import useProgramCache from "@/stores/useProgramCache";
import examples from "@/utils/CodeExamples";

function Header() {
  const [runBtnClicked, isRunBtnClicked, toggleStoreProgramBtn] = useGlobals(
    (state) => [
      state.runBtnClicked,
      state.isRunBtnClicked,
      state.toggleStoreProgramBtn,
    ]
  );
  const [resetProgram, setCode, resetMessages] = useProgramCache((state) => [
    state.resetProgram,
    state.setCode,
    state.resetMessages,
  ]);

  useEffect(() => {
    if (isRunBtnClicked) console.log("header - Executing...");
    else console.log("header - RUN");
  }, [isRunBtnClicked]);

  return (
    <header className="flex items-center justify-between px-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="flex items-center space-x-4">
        <a href="https://docs.nillion.com/" target="_blank">
          <img src="./logo.svg" alt="Nillion" className="h-16 w-16" />
        </a>
      </div>

      <div className="flex items-center space-x-4">
        <select
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          onClick={toggleStoreProgramBtn}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          STORE
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
      </div>
    </header>
  );
}

export default Header;
