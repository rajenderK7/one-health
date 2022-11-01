import {
  useState,
  useEffect,
  useContext,
} from "react";
import UserContext from "../../context/userContext";
import {
  doc,
  collection,
  where,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";
import { sessionModel } from "../../models/sessionModel";
import ActiveCard from "./ActiveCard";
function DoctorHome() {
  const [appointments, setAppointments] = useState([] as any);
  const [active, setActive] = useState([] as any);
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
      const res = (await getDocs(apptQuery)).docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const res1 = (await getDocs(activeQuery)).docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAppointments(res);
      setActive(res1);
      return { res, res1 };
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
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
  }, [user]);

  return (
    <div className="container">
      {appointments.length > 0 && <h4>New Appointments</h4>}
      {appointments.map((appointment: sessionModel) => {
        return <AppointmentCard {...appointment} />;
      })}

      {active.length > 0 && <h4>Active Appointments</h4>}
      {active.map((active: sessionModel) => {
        return <ActiveCard {...active} />;
      })}
    </div>
  );
}

export default DoctorHome;
