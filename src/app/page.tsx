"use client";
import useGlobals, { InitializationState } from "@/stores/useGlobals";
import { fetchCode } from "@/utils/helper";
import useInit from "@/utils/useInit";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import MyEditor from "./Program/Editor";
import MessageDisplay from "./Program/MessageDisplay";
import { ResizableBox } from "react-resizable";
import "react-toastify/dist/ReactToastify.css";
import "react-resizable/css/styles.css";
import OutputDisplay from "./Program/OutputDisplay";
import InputDisplay from "./Program/InputDisplay";
import LoadingDisplay from "./components/LoadingDisplay";
import ToastProvider from "./components/ToastProvider";
import { useSearchParams } from "next/navigation";
import UploadModal from "./components/UploadModal";

function Platform() {
  const maxMessageDisplayHeight = (window.innerHeight * 25.0) / 100;
  const [messageHeight, setMessageHeight] = useState(maxMessageDisplayHeight);
  const searchParams = useSearchParams();

  const [
    initializationState,
    storeProgramBtnClicked,
    isUploadBtnClicked,
    lightThemeEnabled,
  ] = useGlobals((state) => [
    state.initalizationState,
    state.storeProgramBtnClicked,
    state.isUploadBtnClicked,
    state.lightThemeEnabled,
  ]);

  useInit();
  useEffect(() => {
    const sharedValue = searchParams.get("shared");
    fetchCode(sharedValue || "");
  }, []);

  const onResize = useCallback(
    (_: SyntheticEvent, data: { size: { height: number } }) => {
      setMessageHeight(data.size.height);
    },
    []
  );

  return (
    <div
      className={`flex flex-col w-full h-screen absolute ${
        lightThemeEnabled ? "bg-gray-100" : "bg-gray-800"
      }`}
    >
      <ToastProvider>
        <div
          className={`h-screen flex flex-1 flex-col transition-opacity duration-300 ${
            initializationState === InitializationState.Completed ||
            !storeProgramBtnClicked ||
            !isUploadBtnClicked
              ? "opacity-100"
              : "opacity-35 pointer-events-none"
          }`}
        >
          <Header />
          <div
            className={`flex h-screen mb-3 mx-2 overflow-hidden space-x-2 ${
              lightThemeEnabled ? "bg-gray-100" : "bg-gray-900"
            }`}
          >
            {/* Left Side: Editor and Message Display */}
            <div className={`w-2/3 flex flex-col h-full space-y-2`}>
              <div
                style={{
                  height: `calc(100% - ${messageHeight}px)`,
                }}
                className={`flex-1 ${
                  lightThemeEnabled ? "bg-white" : "bg-gray-900"
                } shadow-lg rounded-lg overflow-hidden`}
              >
                <MyEditor messageHeight={messageHeight} />
              </div>
              <ResizableBox
                height={messageHeight}
                width={Infinity}
                axis="y"
                resizeHandles={["n"]}
                minConstraints={[Infinity, 100]}
                maxConstraints={[Infinity, maxMessageDisplayHeight]}
                onResize={onResize}
                className={`flex flex-col ${
                  lightThemeEnabled ? "bg-white" : "bg-gray-900"
                } shadow-lg rounded-lg overflow-hidden`}
              >
                <MessageDisplay />
              </ResizableBox>
            </div>
            {/* Right Side: Input and Output Display */}
            <div className={`w-1/3 flex flex-col h-full space-y-2`}>
              <div
                className={`flex-1 ${
                  lightThemeEnabled ? "bg-white" : "bg-gray-900"
                } shadow-lg rounded-lg overflow-hidden`}
              >
                <InputDisplay />
              </div>
              <div
                className={`flex-1 ${
                  lightThemeEnabled ? "bg-white" : "bg-gray-900"
                } shadow-lg rounded-lg overflow-hidden`}
              >
                <OutputDisplay />
              </div>
            </div>
          </div>
        </div>

        {/* Loading and Notifications */}
        {initializationState === InitializationState.Completed ? null : (
          <LoadingDisplay />
        )}
        {isUploadBtnClicked ? <UploadModal /> : null}
      </ToastProvider>
    </div>
  );
}

export default Platform;
