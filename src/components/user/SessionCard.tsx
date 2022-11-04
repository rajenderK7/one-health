import FileSaver from "file-saver";
import { collection, doc, updateDoc } from "firebase/firestore";
import { Button, Card } from "react-bootstrap";
import { sessionStatus } from "../../constants/sessionStatus";
import { db } from "../../lib/firebase";
import { SessionModel } from "../../models/sessionModel";
import { somethingWentWrong } from "../../utils/somethingWentWrongToast";
import DiagnosticCentersModal from "./DiagnosticCentersModal";

export interface SessionCardProps {
  session: SessionModel;
  handleCancelAppointment: any;
}

const SessionCard = ({
  session,
  handleCancelAppointment,
}: SessionCardProps) => {
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

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body>
        <Card.Title>Dr. {session.doctorName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Status: {sessionStatus[session.complete]}
        </Card.Subtitle>
        <Card.Text>Symptoms: {session.symptoms}</Card.Text>
        {session.complete >= 2 && (
          <div>
            Meet Link:
            <Card.Link className="ms-2" href="#">
              {session.meetLink ?? "Not available yet."}
            </Card.Link>
          </div>
        )}
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
        {session.prescriptionDownloadLink && (
          <Button className="me-2 bg-warning mt-3 border-0 btn-sm">
            Order Medicine
          </Button>
        )}
        {/* Book diagonstics is available only after prescription download link is available */}
        {session.prescriptionDownloadLink && (
          <DiagnosticCentersModal sessionID={session.sessionID} />
        )}
        {/* Show the `Cancel Appointment` option only before the payment is done */}
        {session.complete < 2 && (
          <Button
            onClick={() =>
              handleCancelAppointment(session.sessionID, session.doctorID)
            }
            className="bg-danger mt-3 border-0 btn-sm"
          >
            Cancel Appointment
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SessionCard;
