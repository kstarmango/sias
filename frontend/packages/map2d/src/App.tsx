import './App.css';
import {ErrorInfo} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Route, Routes} from 'react-router-dom';
import {ErrorFallback} from '@src/components/shared';
import MainIndexPage from "@src/pages/indexPage.tsx";
import {LoginPage} from "@src/pages/LoginPage.tsx";
import MainLayout from "@src/pages/MainLayout.tsx";
import {Map2DIndexPage, Map2DLayoutPage} from "@src/pages/map2d";
import {Page403, Page404} from "@src/pages/error";
import ProtectedRoute from "@shared/components/ProtectedRoute.tsx";

const logError = (error: Error, info: ErrorInfo) => {
  console.log(error, info);
};

function App() {
  return (
    <>
      <ErrorBoundary onError={logError} FallbackComponent={ErrorFallback}>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route element={<ProtectedRoute/>}>
              { /* 메인 인덱스 페이지 */}
              <Route index element={<MainIndexPage/>}/>

              { /* 2D 지도 페이지 */}
              <Route path="/2d" element={<Map2DLayoutPage/>}>
                <Route index element={<Map2DIndexPage/>}/>
              </Route>
            </Route>

            { /* 로그인 페이지 */}
            <Route path="login" element={<LoginPage/>}/>

            { /* 403, 404 에러 페이지 */}
            <Route path="403" element={<Page403/>}/>
            <Route path="*" element={<Page404/>}/>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;