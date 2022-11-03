import {
  arrayRemove,
  collection,
  doc,
  query,
  where,
  writeBatch,
} from "@firebase/firestore";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import { db } from "../../lib/firebase";
import SessionCard from "./SessionCard";
import { useCollectionData } from "react-firebase-hooks/firestore";

const MyAppointments = () => {
  const { user } = useContext(UserContext);

  const appointmentsQuery = query(
    collection(db, "session"),
    where("userID", "==", user?.uid),
    where("active", "==", true)
  );

  const [value, loading] = useCollectionData(appointmentsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const handleCancelAppointment = async (
    sessionID: string,
    doctorID: string
  ) => {
    try {
      console.log(sessionID);

      const sessionRef = doc(collection(db, "session"), sessionID.trim());
      const userRef = doc(collection(db, "users"), user?.uid);
      const batch = writeBatch(db);
      batch.delete(sessionRef);
      batch.update(userRef, {
        appointments: arrayRemove(doctorID),
      });

      await batch.commit();
      console.log("Cancelled the appointment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="my-3">My Appointments</h2>
      {loading && <p>Loading...</p>}
      {value &&
        value?.map((doc: any, index: any) => {
          return (
            <SessionCard
              key={index}
              session={doc}
              handleCancelAppointment={handleCancelAppointment}
            />
          );
        })}
      {value?.length === 0 && (
        <p>You don't have any current appointments. 🙂</p>
      )}
    </div>
  );
};

export default MyAppointments;
