import useProgramCache from "@/stores/useProgramCache";
import DisplayPanel from "../components/DisplayPanel";

export default function OutputDisplay() {
  const outputElements = useProgramCache((state) => state.output);

  return (
    <DisplayPanel name="Output">
      <div className="overflow-y-auto h-full">
        {outputElements.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 bg-white dark:bg-gray-900 shadow-sm rounded-lg">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Output Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Output Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {outputElements.map((outputElement) => (
                <tr
                  key={outputElement.name}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                    {outputElement.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                    {outputElement.value || "No output"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 p-4">No output</p>
        )}
      </div>
    </DisplayPanel>
  );
}
