import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import UserBookAppointment from "./components/user/UserBookAppointment";
import DoctorHome from "./components/doctor/DoctorHome";
import UserHome from "./components/user/UserHome";
import UserContext from "./context/userContext";
import RegisterDoctor from "./components/doctor/RegisterDoctor";
import DiagnosisHome from "./components/diagnosisCenter/DiagnosisHome";
import RegisterCenter from "./components/diagnosisCenter/RegisterCenter";
import BookBeds from "./components/user/BookBeds";

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
          <Route path="/" element={<UserHome />} />
          <Route path="/user" element={<AuthRoute requiredRole={1} />}>
            <Route path="" element={<div>Checker</div>} />
            <Route path="book-appointment" element={<UserBookAppointment />} />
            <Route path="book-beds" element={<BookBeds />} />
          </Route>
        </Routes>
      );

    case 2:
      return (
        <Routes>
          <Route path="/" element={<DoctorHome />}></Route>
          <Route path="/register" element={<RegisterDoctor />}></Route>
        </Routes>
      );

    case 3:
      return (
        <Routes>
          <Route path="/" element={<DiagnosisHome />}></Route>
          <Route path="/register" element={<RegisterCenter />}></Route>
        </Routes>
      );
    default:
      return <div>Page does not exits</div>;
  }
};

export default Router;
