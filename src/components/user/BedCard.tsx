import { collection, doc, increment, updateDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { db } from "../../lib/firebase";
import BedsModel from "../../models/bedsModel";
import { somethingWentWrong } from "../../utils/somethingWentWrongToast";

function BedCard(bed: BedsModel) {
  const navigate = useNavigate();

  const handleBookAppointment = async () => {
    try {
      const bedsRef = doc(collection(db, "beds"), bed.uid);
      await updateDoc(bedsRef, {
        bedsAvailable: increment(-1),
      });

      // send mail to the user regarding the booking

      toast.success("Succesfully booked bed.");
      navigate("/");
    } catch (error) {
      somethingWentWrong(error);
    }
  };

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Header>
        <Card.Title className="mt-1">{bed.hospitalName}</Card.Title>
        {bed.location}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Beds Available: </strong>
          <span className="fs-5">{bed.bedsAvailable}</span>
        </Card.Text>
        <Card.Text>
          <strong>Address: </strong>
          {bed.address}
        </Card.Text>
        <Card.Text>
          <strong>Phone: </strong>
          {bed.phone}
        </Card.Text>
        <Button onClick={handleBookAppointment} variant="success">
          Book Bed
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BedCard;
