import {
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import emailjs from "emailjs-com";
import { Button, Card } from "react-bootstrap";
import { SessionModel } from "../../models/sessionModel";
const axios = require('axios');
// TODO
// 1.FIX EMAILJS PARAMS
function AppointmentCard(appointment: SessionModel) {
  const sendEmail = () => {
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
    try {
      await updateDoc(doc(db, "session", appointment.sessionID), { complete: 1 });
      console.log("Accepted");
    } catch (err) {
      console.log(err);
    }
    try{
      const res = await axios.post('http://localhost:4343/session-payment-link', {
	    doctorName: appointment.doctorName,
	    sessionID: appointment.sessionID,
	    consultationFee: appointment.doctorMail
    });
    }catch(err){
      console.log(err)
    }
    // email.js
    sendEmail();
  };

  const handleReject = async () => {
    try {
      await deleteDoc(doc(db, "session", appointment.sessionID));
    } catch (err) {
      console.log(err);
    }
    // email.js
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
function then(arg0: (response: any) => void) {
  throw new Error("Function not implemented.");
}

