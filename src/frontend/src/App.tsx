import './App.css';
import {ErrorInfo, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useRoutes} from 'react-router-dom';
import routes from '~react-pages';
import {ErrorFallback} from '@src/components/shared';

const logError = (error: Error, info: ErrorInfo) => {
  console.log(error, info);
};

function App() {
  return (
    <>
      <ErrorBoundary onError={logError} FallbackComponent={ErrorFallback}>
        <Suspense>{useRoutes(routes)}</Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;