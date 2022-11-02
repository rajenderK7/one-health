import {
  doc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import emailjs from "emailjs-com";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { SessionModel } from "../../models/sessionModel";
// TODO
// 1.FIX EMAILJS PARAMS
function AppointmentCard(appointment: SessionModel) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const sendEmail = (appointment: SessionModel) => {
    var templateParams = {
      paitent_name: appointment.userID,
      to_email: "sritish.10@gmail.com",
      doctor_name: appointment.doctorID,
      symptoms: "symptoms",
      doctor_fee: "400",
      html:"<b>bold</b>"
    };
    emailjs
      .send(
        "service_sv44lfb",
        "template_c1efoau",
        templateParams,
        "J8mT6HeY80F3gE4t2"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const handleAccept = async () => {
    const q = query(
      collection(db, "session"),
      where("complete", "==", 0),
      where("doctorID", "==", appointment.doctorID),
      where("userID", "==", appointment.userID)
    );
    const snap = (await getDocs(q)).forEach((doc) => {
      setId(doc.id);
    });
    // update doc
    await updateDoc(doc(db, "session", id), { complete: 3 });
    console.log("Accepted")

    // email.js
    sendEmail(appointment);
    return snap;
  };

  const handleReject = async () => {
    const q = query(
      collection(db, "session"),
      where("complete", "==", 0),
      where("doctorID", "==", appointment.doctorID),
      where("userID", "==", appointment.userID)
    );
    const snap = (await getDocs(q)).forEach((doc) => {
      setId(doc.id);
    });
    await deleteDoc(doc(db, "session", id));
  };

  async function getUser() {
    try {
      const userRef = doc(db, "users", appointment.userID);
      const res = await getDoc(userRef);
      setName(res.data()?.name);
      console.log(name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button className="me-3" onClick={handleAccept}>
            Accept
          </Button>
          <Button onClick={handleReject}>Reject</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AppointmentCard;
