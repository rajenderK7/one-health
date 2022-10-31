import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import UserContext from "../../context/userContext";
import { db } from "../../lib/firebase";
import { DoctorModel } from "../../models/doctorModel";

function DoctorCard(doctor: DoctorModel) {
  const { user } = useContext(UserContext);

  const handleBookAppointment = async () => {
    // create session
    const sessionRef = collection(db, "session");
    try {
      await addDoc(sessionRef, {
        userID: user?.uid,
        doctorID: doctor.uid,
        active: Boolean(true),
        complete: Number(0),
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Appointment booked.");
  };

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
        <Button onClick={handleBookAppointment} className="bg-success border-0">
          Book Appointment
        </Button>
      </Card.Body>
    </Card>
  );
}

export default DoctorCard;
