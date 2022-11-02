import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Home } from "../pages/Home";
import { UserList } from "../pages/CadUsers";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { BrandList } from "../pages/CadBrand";
import { StateList } from "../pages/CadState";
import { CarList } from "../pages/CadCars";
import { ModeloList } from "../pages/CadModelo";
import { CityList } from "../pages/CadCity";
import { ClientList } from "../pages/CadClient";

export function Router() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
        <Route path="/states" element={<StateList />} />
        <Route path="/brands" element={<BrandList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/cars" element={<CarList/>} />
        <Route path="/modelos" element={<ModeloList/>} />
        <Route path="/cities" element={<CityList/>} />
        <Route path="/clients" element={<ClientList/>} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


