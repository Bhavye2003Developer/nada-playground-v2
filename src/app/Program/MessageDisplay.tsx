"use client";

import { useEffect } from "react";
import DisplayPanel from "../components/DisplayPanel";
import useProgramCache from "@/stores/useProgramCache";

type MessageColorType = {
  [messageCls: string]: string;
};

const messageColors: MessageColorType = {
  information: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

function MessageDisplay() {
  const messages = useProgramCache((state) => state.messages);

  useEffect(() => {
    console.log("message updated: ", messages);
  }, [messages]);

  return (
    <DisplayPanel name="Program Info">
      <div className="p-4 space-y-2">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const [cls, txt] = message;
            const colorClass = messageColors[cls.toLowerCase()];
            return (
              <div
                key={index}
                className={`flex items-start space-x-2 ${colorClass}`}
              >
                {cls !== "Information" && (
                  <span className="font-semibold">{cls}:</span>
                )}
                <span>{txt}</span>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No messages</p>
        )}
      </div>
    </DisplayPanel>
  );
}

export default MessageDisplay;
