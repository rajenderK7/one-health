import { collection, doc, updateDoc } from "@firebase/firestore";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import DiagnosticCenterCard from "./DiagnosticCenterCard";
import { toast } from "react-hot-toast";
import { somethingWentWrong } from "../../utils/somethingWentWrongToast";
import SelectCategory from "./SelectCategory";
import { selectCities } from "../../constants/selectCities";

export interface DiagnosticCentersModalProps {
  sessionID: string;
}

const DiagnosticCentersModal = ({ sessionID }: DiagnosticCentersModalProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState("select");
  const [filteredDiagnostics, setFilteredDiagnostics] = useState([] as any);

  const diagnosticCenterQuery = collection(db, "diagnostics");
  const [diagonsticCenters, loading] = useCollectionData(diagnosticCenterQuery);

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
    handleSearch();
  };

  const handleSearch = () => {
    const docs = diagonsticCenters?.filter(
      (doc: any) => doc.place === category
    );
    setFilteredDiagnostics(docs);
  };

  const handleAddDiagnostic = async (diagnosticID: string, eta: string) => {
    try {
      const sessionRef = doc(collection(db, "session"), sessionID);
      await updateDoc(sessionRef, {
        diagnosticID: diagnosticID,
        eta: eta,
      });
      toast.success("Successfully booked diagnostic center.");
    } catch (error) {
      somethingWentWrong(error);
    }
  };

  return (
    <>
      <Button className="bg-success btn-sm border-0 mt-3" onClick={handleShow}>
        Book Diagnostic Center
      </Button>

      <Modal className="w-100" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Select the nearest diagnostic center to you 📌
          </Modal.Title>
          <SelectCategory
            category={category}
            handleCategoryChange={handleCategoryChange}
            selectCategories={selectCities}
          />
        </Modal.Header>
        <Modal.Body>
          <>
            {loading && <p>loading</p>}
            {category === "select" &&
              diagonsticCenters &&
              diagonsticCenters.map((diagnostic: any) => {
                return (
                  <DiagnosticCenterCard
                    key={diagnostic.uid}
                    diagnostic={diagnostic}
                    handleAddDiagnostic={handleAddDiagnostic}
                    handleClose={handleClose}
                  />
                );
              })}
            {category !== "select" &&
              filteredDiagnostics &&
              filteredDiagnostics.map((diagnostic: any) => {
                return (
                  <DiagnosticCenterCard
                    key={diagnostic.uid}
                    diagnostic={diagnostic}
                    handleAddDiagnostic={handleAddDiagnostic}
                    handleClose={handleClose}
                  />
                );
              })}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DiagnosticCentersModal;
