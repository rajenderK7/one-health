import {
  doc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import emailjs from "emailjs-com";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { sessionModel } from "../../models/sessionModel";
import { getAdditionalUserInfo, sendEmailVerification } from "firebase/auth";

function AppointmentCard(appointment: sessionModel) {
  const [id, setId] = useState("");

  const sendEmail = (appointment: sessionModel) => {
    var templateParams = {
      paitent_name: appointment.userID,
      paitent_email: {},
      doctor_name: "Check this out!",
      symptoms: {},
      doctor_fee: {},
    };
    emailjs
      .send("gmail", "template_c1efoau", templateParams, "J8mT6HeY80F3gE4t2")
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
    console.log(id);
    await updateDoc(doc(db, "session", id), { complete: 1 });

    console.log("Rejected");
  };

  async function getU() {
    const ref = doc(db, "users", appointment.userID);
    const docSnap = await getDoc(ref);let user:any;
    return docSnap.data()
  }

  function getUser() {
    console.log(getU());

    return <></>;
  }

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{getUser()}</Card.Title>
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
