import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import { db } from "../../lib/firebase";
import { SessionModel } from "../../models/sessionModel";
import OrderCard from "./OrderCard";

function DiagnosisHome() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [orders,setOrders]=useState([] as any);
  const fetchOrders = async () =>{
    // logic

  }


  useEffect(() => {
    if (user) {
      getDoc(doc(db, "diagonsis", user?.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          fetchOrders();
        } else {
          console.log("Not registered ");
          navigate("/register");
        }
      });
    }
  }, [user]);

  return <div>
    <h4>Dashboard</h4>
    {orders.length ==0 && <h4>No Orders</h4> }
    {orders.map((order:SessionModel)=>{
      return <OrderCard {...order} />
    })}
  </div>;
}

export default DiagnosisHome;
