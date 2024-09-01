import useGlobals from "@/stores/useGlobals";
import { useState } from "react";

function CodeShareBtn() {
  const [isSharedBtnClicked, setIsSharedBtnClicked] = useState(false);
  const [isHideBtnActive, setIsHideBtnActive] = useState(false);
  const sharedLink = useGlobals((state) => state.sharedLink);
  return (
    <div className="flex">
      <button
        className="border border-black p-1 rounded-md hover:bg-green-400 my-4 mr-10 text-md"
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
          className="my-4 mr-10 p-2 rounded-md"
        />
      ) : null}
    </div>
  );
}

export default CodeShareBtn;
