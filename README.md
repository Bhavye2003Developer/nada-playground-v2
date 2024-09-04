# Nada Sandbox

Nada Sandbox is a browser-based interactive development environment for authoring, sharing, and simulating Nada programs.

## Features
- **Interactive Code Editor:** Built with CodeMirror, providing a responsive interface.
- **Run Nada Code:** Execute Nada programs directly in the browser using Pyodide and WebAssembly (WASM).
- **Program Info:** Get detailed information on whether your program ran successfully or encountered errors.
- **Dynamic UI:** The interface dynamically adjusts to provide an optimal user experience.
- **Code Sharing:** Easily share your Nada code with others via unique URLs.
- **Preloaded Examples:** Start testing Nada programs immediately with preloaded examples.
- **No Backend Required:** The entire application is implemented as a static webpage without the need for a backend server, ensuring fast load times and easy hosting.

## Dependencies and Implementation
- **Next.js:** Used for server-side rendering and optimized builds.
- **WebAssembly (WASM):** Utilized for compiling and executing Nada programs in the browser.
- **Pyodide:** Executes Python code directly in the browser, enabling Nada program simulations.
- **Zustand:** Lightweight state management library used for managing the application's state.
- **TypeScript:** Ensures strict type checking for improved code quality and maintainability.
- **CodeMirror:** Provides the interactive code editor.

## Installation

To run Nada playground locally, follow these steps:

1. Clone the repository:

   ```bash
    https://github.com/Bhavye2003Developer/nada-playground-v2
    cd nada-playground-v2
   ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to http://localhost:3000 to start coding and running Nada programs!

## Note

This website is best viewed in dark mode.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any ideas, bug reports, or improvements.

## License
This project is licensed under the MIT License.
