import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Button, Card } from "react-bootstrap";
import { SessionModel } from "../../models/sessionModel";
import { db } from "../../lib/firebase";
import { useState } from "react";
import emailjs from "emailjs-com";
function ActiveCard(active: SessionModel) {
  const [meet, setMeet] = useState("");
  const handleTest = async () => {};
  const sendEmail = (active: SessionModel) => {
    var templateParams = {
      subject:"Zoom Meet",
      name: active.userName,
      to_email:"sritish.10@gmail.com",
      html:"<p>Your appointment has been confrimed. Please Join using the below Link. the seesion will be of <b>45 Mins Only</b></p>",
      meet:active.meetLink,
    };
    emailjs
      .send(
        "service_sv44lfb",
        "template_c1efoau",
        templateParams,
        "J8mT6HeY80F3gE4t2",
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
  const handleMeet = async () => {
    fetch("https://zoom-link.herokuapp.com/")
      .then((res) => res.json())
      .then((data) => {
        setMeet(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    try {
      await updateDoc(doc(db, "session", active.sessionID), { meetLink: meet });
    } catch (err) {
      console.log(err);
    }

    // emial.js buggy
    // sendEmail(active);
  };

  const handleClose = async () => {
    try {
      await updateDoc(doc(db, "session", active.sessionID), { complete: 2 });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <a href="tel:+917993199469">call</a>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{active.userName}</Card.Title>
            <Button className="me-3" onClick={handleTest}>
              Prescription/Test
            </Button>
            <Button className="me-3" onClick={handleMeet}>
              Meet
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ActiveCard;
