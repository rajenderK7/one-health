import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import UserBookAppointment from "./components/user/UserBookAppointment";
import UserHome from "./components/user/UserHome";
import UserContext from "./context/userContext";

const Router = () => {
  const { user, role } = useContext(UserContext);
  console.log(role);

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (role) {
    case 1:
      return (
        <Routes>
          <Route path="/" element={<UserHome />}></Route>
          <Route path="/user" element={<AuthRoute requiredRole={1} />}>
            <Route path="" element={<div>Checker</div>} />
            <Route path="book-appointment" element={<UserBookAppointment />} />
          </Route>
        </Routes>
      );
    default:
      return <div>Page does not exits</div>;
  }
};

export default Router;
