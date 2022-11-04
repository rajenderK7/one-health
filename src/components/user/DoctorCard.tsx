import { arrayUnion, collection, doc, writeBatch } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import UserContext from "../../context/userContext";
import { db } from "../../lib/firebase";
import { DoctorModel } from "../../models/doctorModel";
import SymptomsModal from "./SymptomsModal";
import { toast } from "react-hot-toast";
import { somethingWentWrong } from "../../utils/somethingWentWrongToast";

export interface DoctorCardProps {
  currentUserAppointments?: string[];
  doctor: DoctorModel;
}

function DoctorCard({ doctor, currentUserAppointments }: DoctorCardProps) {
  const { user } = useContext(UserContext);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [symptoms, setSymptoms] = useState("");

  const handleBookAppointment = async () => {
    // create session
    const batch = writeBatch(db);

    const sessionRef = doc(collection(db, "session"));
    const userRef = doc(collection(db, "users"), user?.uid);
    try {
      batch.set(sessionRef, {
        sessionID: sessionRef.id,
        userID: user?.uid,
        doctorID: doctor.uid,
        userName: user?.displayName,
        doctorName: doctor.name,
        symptoms: symptoms,
        userMail: user?.email,
        doctorMail: doctor.mail,
        consultationFee: doctor.consultationFee,
        active: Boolean(true),
        complete: Number(0),
        paymentDone: Boolean(false),
      });

      batch.update(userRef, {
        appointments: arrayUnion(doctor.uid),
      });

      await batch.commit();
      toast.success("Appointment successfully booked");
    } catch (error) {
      console.log(error);
      somethingWentWrong(error);
    }
    console.log("Appointment booked.");
  };

  const handleSymptoms = (e: any) => {
    setSymptoms(e.target.value);
  };

  useEffect(() => {
    setAlreadyBooked(currentUserAppointments?.includes(doctor.uid) ?? false);
  }, [currentUserAppointments, doctor.uid]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{doctor.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {doctor.degree}
        </Card.Subtitle>
        <Card.Text>{doctor.description}</Card.Text>
        <div className="d-flex">
          <Card.Text className="mx-2">
            Experience: {doctor.experience}
          </Card.Text>
          <Card.Text className="mx-2">Timings: {doctor.availableHrs}</Card.Text>
          <Card.Text className="mx-2">Fee: {doctor.consultationFee}</Card.Text>
        </div>
        {!alreadyBooked ? (
          <SymptomsModal
            handleSymptoms={handleSymptoms}
            handleBookAppointment={handleBookAppointment}
          />
        ) : (
          <Button
            disabled={alreadyBooked}
            onClick={handleBookAppointment}
            className="bg-warning border-0"
          >
            Already booked
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default DoctorCard;
