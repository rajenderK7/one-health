import { Button, Card } from "react-bootstrap";
import DiagnosticModel from "../../models/diagnosticModel";
import { IoLocationSharp } from "react-icons/io5";

export interface DiagnosticCenterProps {
  diagnostic: DiagnosticModel;
  handleAddDiagnostic: any;
  handleClose: any;
}

const DiagnosticCenterCard = ({
  diagnostic,
  handleAddDiagnostic,
  handleClose,
}: DiagnosticCenterProps) => {
  const handleSelection = () => {
    handleAddDiagnostic(diagnostic.uid);
    handleClose();
  };

  return (
    <Card style={{ width: "auto" }} className="my-2">
      <Card.Body>
        <Card.Title>{diagnostic.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
          <IoLocationSharp />
          <span className="ms-1">{diagnostic.place}</span>
        </Card.Subtitle>
        <Card.Text>{diagnostic.description}</Card.Text>
        <Button
          onClick={handleSelection}
          className="bg-primary border-0 text-sm"
        >
          Book
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DiagnosticCenterCard;
