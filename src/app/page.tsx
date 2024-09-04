import { Suspense } from "react";
import Platform from "./components/Platform";
import LoadingDisplay from "./components/LoadingDisplay";

export default function Page() {
  return (
    <Suspense fallback={<LoadingDisplay />}>
      <Platform />
    </Suspense>
  );
}
