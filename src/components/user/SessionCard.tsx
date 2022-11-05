import axios from "axios";
import FileSaver from "file-saver";
import { collection, doc, updateDoc } from "firebase/firestore";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { sessionStatus } from "../../constants/sessionStatus";
import { db } from "../../lib/firebase";
import { SessionModel } from "../../models/sessionModel";
import { somethingWentWrong } from "../../utils/somethingWentWrongToast";
import DiagnosticCentersModal from "./DiagnosticCentersModal";
import emailjs from "emailjs-com";
import { useState, useEffect } from "react";

export interface SessionCardProps {
  session: SessionModel;
  handleCancelAppointment: any;
}

const SessionCard = ({
  session,
  handleCancelAppointment,
}: SessionCardProps) => {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // const [origin, setOrigin] = useState(["", ""]);
  // const [distances, setDistances] = useState([] as any);
  const apiEndpoint = () => {
    return `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=17.5370841,78.3844623&destinations=17.44082648817257,78.44329286405467&departure_time=now&key=oEKfqegbqDJlftnh40ElraARvOJ9b`;
  };

  const saveFile = () => {
    FileSaver.saveAs(session.prescriptionDownloadLink ?? "", "Prescription");
  };

  const handlePayment = async () => {
    try {
      const sessionRef = doc(collection(db, "session"), session.sessionID);
      await updateDoc(sessionRef, {
        complete: 2,
      });
    } catch (error) {
      somethingWentWrong(error);
    }
  };

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const sendEmail = async (paymentLink: string) => {
    var templateParams = {
      subject: "Medicine Order",
      name: session.userName,
      to_email: session.userMail,
      html: `<p>Your medicine order is successful</p><p>Regards,</p><p>One Health</p>`,
      link: "Payment link: ".concat(paymentLink),
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

  const handleOrderMedicine = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4343/generic-payment-link",
        {
          name: session.userName,
          reqPrice: getRandomInt(800, 1600).toString(),
          isPharma: true,
        }
      );

      // console.log(res.data);

      const paymentLink = res.data.paymentLink;

      if (paymentLink) {
        sendEmail(paymentLink);
        openInNewTab(paymentLink);
      }
      const sessionRef = doc(collection(db, "session"), session.sessionID);
      await updateDoc(sessionRef, {
        paymentDone: true,
      });
      toast.success("Medicine order placed please check your mail.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Body>
        <Card.Title>Dr. {session.doctorName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Status: {sessionStatus[session.complete]}
        </Card.Subtitle>
        <Card.Text>Symptoms: {session.symptoms}</Card.Text>
        {session.complete >= 2 && (
          <div>
            Meet Link:
            <Card.Link
              className="ms-2"
              href={session.meetLink}
              target="_blank"
              rel="noreferrer"
            >
              {session.meetLink ? "Start meet" : "Not available yet."}
            </Card.Link>
          </div>
        )}
        {session.eta && <Card.Text>ETA Medicine: {session.eta} Mins</Card.Text>}
        {/* Add download functionality */}
        {session.complete >= 2 && session.prescriptionDownloadLink && (
          <Button
            onClick={saveFile}
            className="me-2 bg-info mt-3 border-0 btn-sm"
          >
            Download Presctiption
          </Button>
        )}
        {/* If Complete = 1 show payment link */}
        {session.complete === 1 && (
          <p className="text-primary">
            <span className="text-dark">Note:</span> Please fulfil the payment
            to continue with consultation.
          </p>
        )}
        {session.complete === 1 && session.paymentLink && (
          <Button
            onClick={handlePayment}
            className="me-2 bg-success mt-3 border-0 btn-sm"
          >
            <a
              className="text-white text-decoration-none"
              href={
                session.paymentLink ??
                "https://buy.stripe.com/test_28o00s22w566b5u28g"
              }
              rel="noreferrer"
              target="_blank"
            >
              Make Payment
            </a>
          </Button>
        )}
        {/* Order medicine is available only after prescription download link is available */}
        {session.prescriptionDownloadLink && !session.paymentDone && (
          <Button
            onClick={handleOrderMedicine}
            className="me-2 bg-warning mt-3 border-0 btn-sm"
          >
            Order Medicine in house
          </Button>
        )}
        {/* Book diagonstics is available only after prescription download link is available */}
        {session.prescriptionDownloadLink && (
          <DiagnosticCentersModal sessionID={session.sessionID} />
        )}
        {/* Show the `Cancel Appointment` option only before the payment is done */}
        {session.complete < 3 && (
          <Button
            onClick={() =>
              handleCancelAppointment(
                session.sessionID,
                session.doctorID.trim()
              )
            }
            className="bg-danger mt-3 border-0 btn-sm w-100"
          >
            Cancel Appointment
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SessionCard;
