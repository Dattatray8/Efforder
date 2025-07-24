import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      
      </Route>
    </Routes>
  );
}

export default AppRoutes;
