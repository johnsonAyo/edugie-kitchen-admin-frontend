import AdminLayout from "./layouts/AdminLayout";
import { Routes, Route } from "react-router";
import Admin from "./pages/Admin";
import { Outlet } from "react-router-dom";
import "./default.scss";

const AdminLayouts = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminLayouts />}>
          <Route path="/" element={<Admin />} />
        </Route>
      </Routes>

      {/* <Admin /> */}
    </div>
  );
}

export default App;
