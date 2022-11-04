import { collection, doc, increment, updateDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { db } from "../../lib/firebase";
import BedsModel from "../../models/bedsModel";
import { somethingWentWrong } from "../../utils/somethingWentWrongToast";
import emailjs from "emailjs-com";
import { useContext } from "react";
import UserContext from "../../context/userContext";

function BedCard(bed: BedsModel) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const sendEmail = () => {
    var templateParams = {
      name:bed.userName,
      subject:"Bed Confirmed",
      to_email: "sritish.10@gmail.com",
      message: "Your bed has been confirmed with ".concat(bed.hospitalName).concat(" text")
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
  const handleBookAppointment = async () => {
    try {
      const bedsRef = doc(collection(db, "beds"), bed.uid);
      await updateDoc(bedsRef, {
        bedsAvailable: increment(-1),
        userName:user?.uid,
      });

      // send mail to the user regarding the booking
      sendEmail();
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
