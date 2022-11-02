import { Button, Card } from "react-bootstrap";
import { sessionStatus } from "../../constants/sessionStatus";
import { SessionModel } from "../../models/sessionModel";

export interface SessionCardProps {
  session: SessionModel;
  handleCancelAppointment: any;
}

const SessionCard = ({
  session,
  handleCancelAppointment,
}: SessionCardProps) => {
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body>
        <Card.Title>Dr. {session.doctorName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Status: {sessionStatus[session.complete]}
        </Card.Subtitle>
        <Card.Text>Symptoms: {session.symptoms}</Card.Text>
        <div className="d-flex align-items-center">
          Meet Link:
          <Card.Link className="ms-2" href="#">
            Another Link
          </Card.Link>
        </div>
        {/* Order medicine is available only after prescription download link is available */}
        <Button className="me-2 bg-warning mt-3 border-0 btn-sm">
          Order Medicine
        </Button>
        {/* Book diagonstics is available only after prescription download link is available */}
        <Button
          onClick={() =>
            handleCancelAppointment(session.sessionID, session.doctorID)
          }
          className="me-2 bg-info mt-3 border-0 btn-sm"
        >
          Book Diagnostic Center
        </Button>
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
