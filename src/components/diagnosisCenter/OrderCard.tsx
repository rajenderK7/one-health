import FileSaver from 'file-saver';
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { SessionModel } from '../../models/sessionModel'

function OrderCard(order:SessionModel) {
  
  const saveFile = () => {
    FileSaver.saveAs(order.prescriptionDownloadLink ?? "", "Prescription");
  };
  const handleETA = async () =>{
    // logic from opensourceapi/matrixjs
  }
  return (
    <div>
      <h4>Active Orders</h4>
      <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{order.userName}</Card.Title>
            <Card.Subtitle>Symptoms: {order.symptoms}</Card.Subtitle>
            <Button onClick={saveFile}>Prescription Link</Button>
            {/* handle start nav and end nav with user and colors. */}
            <Button onClick={handleETA}>Start</Button>
          </Card.Body>
        </Card>
    </div>
  )
}

export default OrderCard