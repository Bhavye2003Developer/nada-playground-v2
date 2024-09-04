import useGlobals from "@/stores/useGlobals";
import { useState } from "react";

function CodeShareBtn() {
  const [isSharedBtnClicked, setIsSharedBtnClicked] = useState(false);
  const [isHideBtnActive, setIsHideBtnActive] = useState(false);
  const [lightThemeEnabled] = useGlobals((state) => [state.lightThemeEnabled]);
  const sharedLink = useGlobals((state) => state.sharedLink);

  return (
    <div
      className={`flex ${
        lightThemeEnabled ? "text-gray-900" : "text-gray-100"
      }`}
    >
      <button
        className={`border ${
          lightThemeEnabled ? "border-black" : "border-gray-700"
        } p-1 rounded-md hover:${
          lightThemeEnabled ? "bg-green-400" : "bg-green-600"
        } my-4 mr-10 text-md`}
        onClick={() => {
          if (isHideBtnActive) {
            setIsSharedBtnClicked(false);
            setIsHideBtnActive(false);
          } else {
            setIsSharedBtnClicked(true);
            setIsHideBtnActive(true);
          }
        }}
      >
        {isHideBtnActive ? "Hide" : "Share"}
      </button>
      {isSharedBtnClicked ? (
        <input
          readOnly
          autoFocus
          type="text"
          value={sharedLink}
          onFocus={(e) => {
            e.target.select();
          }}
          className={`my-4 mr-10 p-2 rounded-md ${
            lightThemeEnabled
              ? "bg-white text-gray-900"
              : "bg-gray-800 text-gray-100"
          }`}
        />
      ) : null}
    </div>
  );
}

export default CodeShareBtn;
