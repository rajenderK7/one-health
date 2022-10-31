import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default PublicRoutes;
