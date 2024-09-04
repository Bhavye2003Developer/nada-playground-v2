"use cient";

import useProgramCache from "@/stores/useProgramCache";
import DisplayPanel from "../components/DisplayPanel";
import { useEffect } from "react";

export default function () {
  const inputs = useProgramCache((state) => state.inputs);

  return (
    <DisplayPanel name="Input">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white dark:bg-gray-800">
          <thead className="bg-blue-100 dark:bg-blue-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Input Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Input Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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

  const update = (value: any) => {
    updateValue(inputInfo.name, eval(value));
    toggleInputChanged();
  };

  return (
    <tr className="bg-white hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-gray-700">
      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
        {inputInfo.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        <input
          type="text"
          value={inputInfo.value}
          onChange={(e) => {
            update(e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {inputInfo.type}
      </td>
    </tr>
  );
}
