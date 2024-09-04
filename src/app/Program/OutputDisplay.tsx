import useProgramCache from "@/stores/useProgramCache";
import useGlobals from "@/stores/useGlobals";
import DisplayPanel from "../components/DisplayPanel";

export default function OutputDisplay() {
  const outputElements = useProgramCache((state) => state.output);
  const [lightThemeEnabled] = useGlobals((state) => [state.lightThemeEnabled]);

  return (
    <DisplayPanel name="Output">
      <div
        className={`overflow-y-auto h-full ${
          lightThemeEnabled
            ? "bg-white text-gray-900"
            : "bg-gray-900 text-gray-100"
        }`}
      >
        {outputElements.length > 0 ? (
          <table
            className={`min-w-full divide-y ${
              lightThemeEnabled
                ? "divide-gray-300 bg-white"
                : "divide-gray-700 bg-gray-900"
            } shadow-sm rounded-lg`}
          >
            <thead
              className={lightThemeEnabled ? "bg-gray-200" : "bg-gray-800"}
            >
              <tr>
                <th
                  className={`px-4 py-2 text-left text-sm font-medium ${
                    lightThemeEnabled ? "text-gray-700" : "text-gray-300"
                  } uppercase tracking-wider`}
                >
                  Output Name
                </th>
                <th
                  className={`px-4 py-2 text-left text-sm font-medium ${
                    lightThemeEnabled ? "text-gray-700" : "text-gray-300"
                  } uppercase tracking-wider`}
                >
                  Output Value
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                lightThemeEnabled
                  ? "divide-gray-200 bg-white"
                  : "divide-gray-700 bg-gray-900"
              }`}
            >
              {outputElements.map((outputElement) => (
                <tr
                  key={outputElement.name}
                  className={`hover:${
                    lightThemeEnabled ? "bg-gray-100" : "bg-gray-700"
                  }`}
                >
                  <td
                    className={`px-4 py-2 text-sm ${
                      lightThemeEnabled ? "text-gray-900" : "text-gray-100"
                    }`}
                  >
                    {outputElement.name}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm ${
                      lightThemeEnabled ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    {outputElement.value || "No output"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p
            className={`text-gray-600 p-4 ${
              lightThemeEnabled ? "text-gray-600" : "text-gray-400"
            }`}
          >
            No output
          </p>
        )}
      </div>
    </DisplayPanel>
  );
}
