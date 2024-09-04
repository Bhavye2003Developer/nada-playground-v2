import React from "react";
import useGlobals from "@/stores/useGlobals";

function DisplayPanel({
  name,
  children,
}: {
  name: string;
  children: React.ReactElement;
}) {
  const [lightThemeEnabled] = useGlobals((state) => [state.lightThemeEnabled]);

  return (
    <div
      className={`flex-1 relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg border m-1 h-full ${
        lightThemeEnabled
          ? "border-gray-300 bg-gray-50"
          : "border-gray-700 bg-gray-900"
      }`}
    >
      <h1
        className={`w-full p-3 mb-3 ${
          lightThemeEnabled
            ? "bg-[#e8d5e4] text-gray-900"
            : "bg-[#4a4a4a] text-gray-100"
        }`}
      >
        {name}
      </h1>
      <div
        className={`px-2 overflow-y-auto h-full ${
          lightThemeEnabled ? "text-gray-900" : "text-gray-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default DisplayPanel;
