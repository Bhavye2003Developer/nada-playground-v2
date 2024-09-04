"use client";

import { Flip, ToastContainer } from "react-toastify";
import useGlobals from "@/stores/useGlobals";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const lightThemeEnabled = useGlobals((state) => state.lightThemeEnabled);

  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        draggable={false}
        pauseOnHover={false}
        transition={Flip}
        className={`${lightThemeEnabled ? "toast-light" : "toast-dark"}`}
      />
    </>
  );
}
