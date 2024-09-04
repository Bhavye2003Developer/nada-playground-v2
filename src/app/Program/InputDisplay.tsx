"use client";

import useProgramCache from "@/stores/useProgramCache";
import DisplayPanel from "../components/DisplayPanel";
import { useEffect } from "react";
import useGlobals from "@/stores/useGlobals";

export default function InputDisplay() {
  const inputs = useProgramCache((state) => state.inputs);
  const [lightThemeEnabled] = useGlobals((state) => [state.lightThemeEnabled]);

  return (
    <DisplayPanel name="Input">
      <div className="overflow-x-auto">
        <table
          className={`min-w-full border-collapse ${
            lightThemeEnabled ? "bg-white" : "bg-gray-800"
          }`}
        >
          <thead
            className={`${lightThemeEnabled ? "bg-blue-100" : "bg-blue-900"}`}
          >
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  lightThemeEnabled ? "text-gray-600" : "text-gray-300"
                } uppercase tracking-wider`}
              >
                Input Name
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  lightThemeEnabled ? "text-gray-600" : "text-gray-300"
                } uppercase tracking-wider`}
              >
                Input Value
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  lightThemeEnabled ? "text-gray-600" : "text-gray-300"
                } uppercase tracking-wider`}
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              lightThemeEnabled ? "divide-gray-200" : "divide-gray-700"
            }`}
          >
            {Object.keys(inputs).map((inputName) => (
              <InputRow
                key={inputName}
                inputInfo={{
                  ...inputs[inputName],
                  name: inputName,
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DisplayPanel>
  );
}

function InputRow({
  inputInfo,
}: {
  inputInfo: {
    value: any;
    type: string;
    name: string;
  };
}) {
  const [updateValue, toggleInputChanged] = useProgramCache((state) => [
    state.updateValue,
    state.toggleInputChanged,
  ]);
  const [lightThemeEnabled] = useGlobals((state) => [state.lightThemeEnabled]);

  const update = (value: any) => {
    updateValue(inputInfo.name, eval(value));
    toggleInputChanged();
  };

  return (
    <tr
      className={`${
        lightThemeEnabled
          ? "bg-white hover:bg-blue-50"
          : "bg-gray-900 dark:hover:bg-gray-700"
      }`}
    >
      <td
        className={`px-6 py-4 text-sm font-medium ${
          lightThemeEnabled ? "text-gray-900" : "text-gray-100"
        }`}
      >
        {inputInfo.name}
      </td>
      <td
        className={`px-6 py-4 text-sm ${
          lightThemeEnabled ? "text-gray-500" : "text-gray-400"
        }`}
      >
        <input
          type="text"
          value={inputInfo.value}
          onChange={(e) => {
            update(e.target.value);
          }}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            lightThemeEnabled
              ? "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
              : "border-gray-600 bg-gray-800 text-gray-200 focus:ring-blue-500"
          }`}
        />
      </td>
      <td
        className={`px-6 py-4 text-sm ${
          lightThemeEnabled ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {inputInfo.type}
      </td>
    </tr>
  );
}
