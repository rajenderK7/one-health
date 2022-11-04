import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext";
import { collection, where, query } from "firebase/firestore";
import { db } from "../../lib/firebase";
import AppointmentCard from "./AppointmentCard";
import { Navigate } from "react-router-dom";
import { SessionModel } from "../../models/sessionModel";
import ActiveCard from "./ActiveCard";

import { useCollectionData } from "react-firebase-hooks/firestore";
function DoctorHome() {
  const [appointments, setAppointments] = useState([] as any);
  const [active, setActive] = useState([] as any);
  const [history, setHistory] = useState([] as any);
  // const [pastAppointments, setPastAppoitments] = useState([] as any);
  const { user, role } = useContext(UserContext);
  // const navigate = useNavigate();

  const apptQuery = query(
    collection(db, "session"),
    where("doctorID", "==", user?.uid)
  );
  const [value, loading] = useCollectionData(apptQuery);

  useEffect(() => {
    // new appointments
    const newAppointments = value?.filter((doc) => {
      return doc.complete === 0;
    });
    setAppointments(newAppointments);
    // active appointments
    const actAppointments = value?.filter((doc) => {
      return doc.complete > 0 && doc.complet < 3;
    });
    setActive(actAppointments);
    // past appointments
    const pstAppointments = value?.filter((doc) => {
      return doc.complete >= 3;
    });
    setHistory(pstAppointments);
  }, [value]);

  // const fetchAppointments = async () => {
  //   try {
  //     const apptQuery = query(
  //       collection(db, "session"),
  //       where("complete", "==", 0),
  //       where("doctorID", "==", user?.uid)
  //     );

  //     const activeQuery = query(
  //       collection(db, "session"),
  //       where("complete", "==", 2),
  //       where("doctorID", "==", user?.uid)
  //     );
  //     const historyQuery = query(
  //       collection(db, "session"),
  //       where("complete", "==", 3),
  //       where("doctorID", "==", user?.uid)
  //     );
  //     const res = onSnapshot(apptQuery, (snapshot) => {
  //       setAppointments(
  //         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //       );
  //     });
  //     const res1 = onSnapshot(activeQuery, (snapshot) => {
  //       setActive(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     });
  //     const res2 = onSnapshot(historyQuery, (snapshot) => {
  //       setHistory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     });
  //     return { res, res1, res2 };
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  if (role !== 2) {
    return <Navigate to="/register" />;
  }

  return (
    <div className="container">
      <h5>{user?.displayName} Dashboard</h5>
      {loading && <p>Loading...</p>}
      {appointments && appointments.length > 0 && <h4>New Appointments</h4>}
      {appointments &&
        appointments.map((appointment: SessionModel) => {
          return <AppointmentCard {...appointment} />;
        })}

      {active && active.length > 0 && <h4>Active Appointments</h4>}
      {active &&
        active.map((active: SessionModel) => {
          return <ActiveCard {...active} />;
        })}
      {history && history.length > 0 && <h4>Past Appointments</h4>}
      {history &&
        history.map((history: SessionModel) => {
          return <ActiveCard {...history} />;
        })}
    </div>
  );
}

export default DoctorHome;
