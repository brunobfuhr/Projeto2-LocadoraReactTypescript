import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Home } from "../pages/Home";
import { UserList } from "../pages/CadUsers";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { BrandList } from "../pages/CadBrand";
import { StateList } from "../pages/CadState";

export function Router() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<UserList />} />
        {/* <Route path="/" element={<BrandList />} /> */}
        {/* <Route path="/" element={<StateList />} /> */}
      </Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


