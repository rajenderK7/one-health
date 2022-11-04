import React from "react";
import { Button, Card } from "react-bootstrap";
import { SessionModel } from "../../models/sessionModel";

function PastCard(active :SessionModel) {
    const handleTest = () =>{};
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{active.userName}</Card.Title>
          <Card.Subtitle>{active.symptoms}</Card.Subtitle>
          <Button className="me-3" onClick={handleTest}>
            Prescription/Test
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PastCard;
