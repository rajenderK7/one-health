import { setDoc, doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import { db } from "../../lib/firebase";

function RegisterDoctor() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [deg, setDeg] = useState("");
  const [desc, setDesc] = useState("");
  const [exp, setExp] = useState("");
  const [hrs, setHrs] = useState("");
  const [hpt, setHpt] = useState("");
  const [fee, setFee] = useState("");
  const [ph, setPh] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    if (user) {
      const ref = doc(db, "doctors", user.uid);
      e.preventDefault();
      await setDoc(ref, {
        uid: user.uid,
        name: name,
        degree: deg,
        description: desc,
        experience: exp,
        hospital: hpt,
        langauges: null,
        phone: ph,
      });
      console.log("Doctor Registered !");
      navigate("/");
    }
  };

  return (
    <div>
      <h4 className="text-center">Register Doctor</h4>
      <Form
        className="w-50 border border-2 border-dark rounded p-2  mx-auto"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="MBBS/M.D"
            name="Dr. name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="text"
            placeholder="MBBS/M.D"
            name="degree"
            value={deg}
            onChange={(e) => {
              setDeg(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            placeholder="5"
            value={exp}
            onChange={(e) => {
              setExp(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Available Hours</Form.Label>
          <Form.Control
            type="text"
            placeholder="16:00 - 18:00"
            value={hrs}
            onChange={(e) => {
              setHrs(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hospital</Form.Label>
          <Form.Control
            type="text"
            placeholder="Hospital"
            value={hpt}
            onChange={(e) => {
              setHpt(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Fees</Form.Label>
          <Form.Control
            type="text"
            placeholder="In Rs."
            value={fee}
            onChange={(e) => {
              setFee(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="+91 7998832233"
            value={ph}
            onChange={(e) => {
              setPh(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterDoctor;
