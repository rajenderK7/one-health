import { collection, doc, getDocs, limit, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { DoctorModel } from "../../models/doctorModel";
import DoctorCard from "./DoctorCard";

const UserBookAppointment = () => {
  const [doctors, setDoctors] = useState([] as any);

  const fetchDoctors = async () => {
    try {
      const doctorsQuery = query(collection(db, "doctors"), limit(10));
      const res = (await getDocs(doctorsQuery)).docs.map((doc) => ({
        ...doc.data(),
      }));
      setDoctors(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  console.log(doctors);

  return (
    <div>
      <h1>UserBookAppointment</h1>
      {doctors.map((doctor: DoctorModel) => {
        return <DoctorCard key={doctor.uid} {...doctor} />;
      })}
    </div>
  );
};

export default UserBookAppointment;
