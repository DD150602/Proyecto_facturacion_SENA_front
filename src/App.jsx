import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeAdmin from "./pages/admin/homeAdmin";
import HomeVendedor from "./pages/vendedor/homeVendedor";
import ProtectedRoute from "./service/route";
import Productos from "./pages/admin/Productos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard_admin"
          element={
            <ProtectedRoute
              elemento={<HomeAdmin />}
              rolesPermitidos={[1]}
            />
          }
        />
        <Route
          path='/inventario'
          element={
            <ProtectedRoute
              elemento={<Productos />}
              rolesPermitidos={[1]}
            />
          }
        />
        <Route
          path="/dashboard_vendedor"
          element={
            <ProtectedRoute
              elemento={<HomeVendedor />}
              rolesPermitidos={[2]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
