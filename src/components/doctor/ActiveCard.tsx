import { updateDoc, doc, collection } from "firebase/firestore";
import { Button, Card, Form } from "react-bootstrap";
import { SessionModel } from "../../models/sessionModel";
import { db, storage } from "../../lib/firebase";
import { useState } from "react";
import emailjs from "emailjs-com";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
function ActiveCard(active: SessionModel) {
  const [meet, setMeet] = useState([] as any);

  const [uploadImg, setUploadImg] = useState<any>();

  const handleUploadImg = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setUploadImg(readerEvent.target?.result);
    };
  };

  const handlePrescriptionUpload = async () => {
    const fileRef = ref(storage, `prescriptions/${active?.sessionID}/`);
    const sessionRef = doc(collection(db, "session"), active.sessionID);
    await uploadString(fileRef, uploadImg, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(fileRef);
        await updateDoc(sessionRef, {
          prescriptionDownloadLink: downloadURL,
        });
      }
    );
  };

  const handleTest = async () => {};

  const sendEmail = (meet: string) => {
    var templateParams = {
      subject: "Zoom Meet",
      name: active.userName,
      to_email: active.userMail,
      html: "<p>Your appointment has been confrimed. Please Join using the below Link. the seesion will be of <b>45 Mins Only</b></p>",
      link: "Meet Link: ".concat(meet),
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
  const handleMeet = async () => {
    fetch("https://zoom-link.herokuapp.com/")
      .then((res) => res.json())
      .then((data) => {
        setMeet(data);
        sendEmail(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    try {
      await updateDoc(doc(db, "session", active.sessionID), {
        meetLink: meet[0],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = async () => {
    try {
      await updateDoc(doc(db, "session", active.sessionID), { complete: 3 });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{active.userName}</Card.Title>
            {active.complete > 1 && (
              <Card.Subtitle>
                <a href={active.meetLink} target="_blank" rel="noreferrer">
                  Meet Link
                </a>
              </Card.Subtitle>
            )}
            <Form.Group controlId="formFile" className="me-3">
              <Form.Label>Upload Prescription</Form.Label>
              <Form.Control type="file" onChange={handleUploadImg} />
            </Form.Group>
            <Button
              className="me-3 bg-primary"
              onClick={handlePrescriptionUpload}
            >
              Upload
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
