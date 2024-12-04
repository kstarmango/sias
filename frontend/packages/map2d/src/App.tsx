// import './App.css';
import {ErrorInfo} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorFallback} from "@shared/components";
import AppRoutes from "@src/routes/AppRoutes.tsx";

const logError = (error: Error, info: ErrorInfo) => {
  console.log(error, info);
};

function App() {
  return (
    <>
      <ErrorBoundary onError={logError} FallbackComponent={ErrorFallback}>
        <AppRoutes/>
      </ErrorBoundary>
    </>
  );
}

export default App;