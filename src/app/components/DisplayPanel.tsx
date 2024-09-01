import React from "react";

function DisplayPanel({
  name,
  children,
}: {
  name: string;
  children: React.ReactElement;
}) {
  return (
    <div className="flex-1 relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg border border-black m-1 h-full">
      <h1 className="w-full p-3 mb-3 bg-[#e8d5e4]">{name}</h1>
      <div className="px-2 overflow-y-auto h-full">{children}</div>
    </div>
  );
}

export default DisplayPanel;
