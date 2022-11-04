import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext";
import {
  doc,
  collection,
  where,
  query,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";
import { SessionModel } from "../../models/sessionModel";
import ActiveCard from "./ActiveCard";
// TODO:
// 1. CRETAE PAST CARD
function DoctorHome() {
  const [appointments, setAppointments] = useState([] as any);
  const [active, setActive] = useState([] as any);
  const [history, setHistory] = useState([] as any);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const apptQuery = query(
        collection(db, "session"),
        where("complete", "==", 0),
        where("doctorID", "==", user?.uid)
      );
      const activeQuery = query(
        collection(db, "session"),
        where("complete", "==", 3),
        where("doctorID", "==", user?.uid)
      );
      const historyQuery = query(
        collection(db, "session"),
        where("complete", "==", 2),
        where("doctorID", "==", user?.uid)
      );
      const res = onSnapshot(apptQuery, (snapshot) => {
        setAppointments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      const res1 = onSnapshot(activeQuery, (snapshot) => {
        setActive(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      const res2 = onSnapshot(historyQuery, (snapshot) => {
        setHistory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return { res, res1,res2};
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    // rcheck role
    if (user) {
      getDoc(doc(db, "doctors", user?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          fetchAppointments();
        } else {
          console.log("Not registered ");
          navigate("/register");
        }
      });
    }
  });

  return (
    <div className="container">
      {appointments.length > 0 && <h4>New Appointments</h4>}
      {appointments.map((appointment: SessionModel) => {
        return <AppointmentCard {...appointment} />;
      })}

      {active.length > 0 && <h4>Active Appointments</h4>}
      {active.map((active: SessionModel) => {
        return <ActiveCard {...active} />;
      })}

      {history.length > 0 && <h4>Past Appointments</h4>}
      {history.map((history: SessionModel) => {
        return <ActiveCard {...history} />;
      })}
    </div>
  );
}

export default DoctorHome;
