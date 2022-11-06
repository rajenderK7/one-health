import { Button, Card } from "react-bootstrap";
import DiagnosticModel from "../../models/diagnosticModel";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getModeForUsageLocation } from "typescript";
import axios from "axios";
import DiagonsisHome from "../diagonsis/DiagonsisHome";
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
  const [eta, setEta] = useState<Number>(-1);
  const [dist, setDist] = useState<Number>(-1);
  // const [origin, setOrigin] = useState(["", ""]);
  // const [distances, setDistances] = useState([] as any);
  const apiEndpoint = (lat: string, long: string) => {
    return `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=17.5370841,78.3844623&destinations=${lat},${long}&departure_time=now&key=oEKfqegbqDJlftnh40ElraARvOJ9b`;
  };

  const getEta = async () => {
    const res = await axios.get(apiEndpoint(diagnostic.location[0],diagnostic.location[1]));
    const data = res.data;
    setEta(Math.floor(data.rows["0"].elements["0"].duration.value / 60));
    setDist(Math.floor(data.rows["0"].elements["0"].distance.value / 1000));
  };

  useEffect(() => {
    getEta();
  }, []);

  return (
    <Card style={{ width: "auto" }} className="my-2">
      <Card.Body>
        <Card.Title>{diagnostic.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted d-flex align-items-center">
          <span className="ms-1">{diagnostic.address}</span>
        </Card.Subtitle>
        {Object.keys(diagnostic.tests).map((test:any, key)=>(
          <Card.Subtitle key={key} className="mb-3">{test}  Rs.{diagnostic.tests[test]}</Card.Subtitle>
        ))}
        <Button
          onClick={handleSelection}
          className="bg-primary border-0 text-sm float-end m-3"
        >
          Book
        </Button>
        <div className="d-block mt-5">
          {eta === -1 ? (
            <h6>Loading...</h6>
          ) : (
            <Card.Subtitle className="d-block">{eta.toString().concat(" Min")}</Card.Subtitle>
          )}
          {dist === -1 ? (
            <h6>Loading...</h6>
          ) : (
            <Card.Subtitle className="d-block">{dist.toString().concat(" Km")}</Card.Subtitle>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DiagnosticCenterCard;
