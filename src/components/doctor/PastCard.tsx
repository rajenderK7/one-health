import React from "react";
import { Button, Card } from "react-bootstrap";
import { SessionModel } from "../../models/sessionModel";

function PastCard(active :SessionModel) {
    const handleTest = () =>{};
  return (
    <div>
      <Card className="mb-3 shadow" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title><b>Patient:</b>  {active.userName}</Card.Title>
          <hr />
          <Card.Subtitle className="mt-3 mb-3"><b>Symptom:</b>  {active.symptoms}</Card.Subtitle>
          <Button className="me-3" onClick={handleTest}>
            Prescription/Test
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PastCard;
