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
  const sendEmail = (appointment: SessionModel) => {
    var templateParams = {
      paitent_name: appointment.userName,
      to_email: "sritish.10@gmail.com",
      doctor_name: appointment.doctorName,
      symptoms: appointment.symptoms,
      doctor_fee: "400",
      html:"<b>bold</b>",
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
    // const q = query(
    //   collection(db, "session"),
    //   where("complete", "==", 0),
    //   where("doctorID", "==", appointment.doctorID),
    //   where("userID", "==", appointment.userID)
    // );
    // const snap = (await getDocs(q)).forEach((doc) => {
    //   setId(doc.id);
    // });
    // update doc 3-> accepted
    try {
      await updateDoc(doc(db, "session", appointment.sessionID), { complete: 3 });
      console.log("Accepted");
    } catch (err) {
      console.log(err);
    }
    // email.js
    sendEmail(appointment);
  };

  const handleReject = async () => {
    // const q = query(
    //   collection(db, "session"),
    //   where("complete", "==", 0),
    //   where("doctorID", "==", appointment.doctorID),
    //   where("userID", "==", appointment.userID)
    // );
    // const snap = (await getDocs(q)).forEach((doc) => {
    //   setId(doc.id);
    // });
    try {
      await deleteDoc(doc(db, "session", appointment.sessionID));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{appointment.userName}</Card.Title>
          <Card.Body>{appointment.symptoms}</Card.Body>
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
