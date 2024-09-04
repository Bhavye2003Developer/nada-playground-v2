import useGlobals, { InitializationState } from "@/stores/useGlobals";

const initializationStates = [
  InitializationState.InitializingPyodide,
  InitializationState.PyodideInitialized,
  InitializationState.InstallingPackages,
  InitializationState.Initializing,
  InitializationState.Completed,
];

function LoadingDisplay() {
  const [initializationState, lightThemeEnabled] = useGlobals((state) => [
    state.initalizationState,
    state.lightThemeEnabled,
  ]);

  const totalStates = initializationStates.length;
  const currentIndex = initializationStates.indexOf(initializationState);
  const progressPercent = Math.round((currentIndex / (totalStates - 1)) * 100);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`absolute inset-0 flex justify-center items-center ${
        lightThemeEnabled ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div className="flex flex-col justify-center items-center" role="status">
        <div className="relative flex items-center justify-center">
          <svg
            className={`transform -rotate-90 w-40 h-40 ${
              lightThemeEnabled ? "text-gray-800" : "text-gray-100"
            }`}
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r={radius}
              strokeWidth="5"
              fill="transparent"
              className={`stroke-gray-300 ${
                lightThemeEnabled ? "text-gray-300" : "text-gray-600"
              }`}
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (progressPercent / 100) * circumference
              }
              className={`transition-transform duration-500 ease-in-out ${
                lightThemeEnabled ? "stroke-blue-500" : "stroke-blue-300"
              }`}
            />
          </svg>
          <span
            className={`absolute text-2xl ${
              lightThemeEnabled ? "text-gray-800" : "text-gray-100"
            }`}
          >
            {progressPercent}%
          </span>
        </div>
        <div className="mt-4">
          <span
            className={`text-xl ${
              lightThemeEnabled ? "text-gray-700" : "text-gray-100"
            }`}
          >
            {initializationState}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoadingDisplay;
