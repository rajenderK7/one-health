import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Button, Card } from "react-bootstrap";
import { sessionModel } from "../../models/sessionModel";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";
function ActiveCard(active: sessionModel) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const handleTest = async () => {};
  const handleMeet = async () => {};

  const handleClose = async () => {
    const q = query(
      collection(db, "session"),
      where("complete", "==", 3),
      where("doctorID", "==", active.doctorID),
      where("userID", "==", active.userID)
    );
    const snap = (await getDocs(q)).forEach((doc) => {
      setId(doc.id);
    });
    // 2 -> close
    await updateDoc(doc(db, "session", id), { complete: 2 });
  };

  async function getUser() {
    try {
      const userRef = doc(db, "users", active.userID);
      const res = await getDoc(userRef);
      setName(res.data()?.name);
      console.log(name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div>
        <a href="tel:+917993199469">call</a>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Button className="me-3" onClick={handleTest}>
              Prescription/Test
            </Button>
            <Button className="me-3" onClick={handleMeet}>
              Meet
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ActiveCard;
