import {Route, Routes} from "react-router-dom";
import {MainLayout} from "@src/layouts";
import {ProtectedRoute} from "@shared/components/routes";
import IndexPage from "@src/pages/indexPage.tsx";
import LoginPage from "@src/pages/LoginPage.tsx";
import {Page403, Page404} from "@shared/pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route element={<ProtectedRoute/>}>
          <Route index element={<IndexPage/>}/>
        </Route>

        { /* 로그인 페이지 */}
        <Route path="login" element={<LoginPage/>}/>

        { /* 403, 404 에러 페이지 */}
        <Route path="403" element={<Page403/>}/>
        <Route path="*" element={<Page404/>}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;