import FileSaver from "file-saver";
import { sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { SessionModel } from "../../models/sessionModel";
import emailjs from "emailjs-com";
import axios from "axios";
import Map from "../ETA/Map";
function OrderCard(order: SessionModel) {
  const [eta, setEta] = useState<Number>(-1);
  const [displayMap, setDisplayMap] = useState(false);
  const saveFile = () => {
    FileSaver.saveAs(order.prescriptionDownloadLink ?? "", "Prescription");
  };
  const apiEndpoint = (lat: string, long: string) => {
    return `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=17.5370841,78.3844623&destinations=${lat},${long}&departure_time=now&key=oEKfqegbqDJlftnh40ElraARvOJ9b`;
  };

  const getEta = async () => {
    const res = await axios.get(
      apiEndpoint("17.495469255783824", "78.39905683322591")
    );
    const data = res.data;
    setEta(Math.floor(data.rows["0"].elements["0"].duration.value / 60));
  };
  const handleStart = () => {
    var templateParams = {
      subject: "Lab Tests Confirmation",
      name: order.userName,
      to_email: order.userMail,
      message: "Youre tests are on the way. Will be delivered in "
        .concat(eta.toString())
        .concat(" Mins."),
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
    setDisplayMap(true);
  };

  useEffect(() => {
    getEta();
  }, []);

  

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{order.userName}</Card.Title>
          <Card.Title>Doctor: Dr.{order.doctorName}</Card.Title>
          <Card.Title>Symptoms: {order.symptoms}</Card.Title>
          <Button
            onClick={saveFile}
            className="me-2 bg-primary mt-3 border-0 btn-sm"
          >
            View Presctiption
          </Button>
          <Button
            className=" bg-success btn-sm btn mt-2 "
            onClick={handleStart}
          >
            start
          </Button>
        </Card.Body>
      </Card>
      {displayMap && <Map
        location={[
          ["17.5370841", "78.3844623"],
          ["17.495469255783824", "78.39905683322591"],
        ]}
      />}
    </div>
  );
}

export default OrderCard;
