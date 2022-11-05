import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { db } from "../../lib/firebase";
import { SessionModel } from "../../models/sessionModel";
import OrderCard from "./OrderCard";

function DiagonsisHome() {
  const { user, role } = useContext(UserContext);
  const [orders, setOrders] = useState([] as any);
  useEffect(() => {
    const orderQuery = query(
      collection(db, "session"),
      where("diagnosticID", "==", user?.uid)
    );
    const res = onSnapshot(orderQuery, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return res;
  }, []);
  return (
    <div className="container">
      <h4>Orders Dashboard</h4>
      {orders && orders.length == 0 && <p>No orders till now :( </p>}
      {orders &&
        orders.map((order: SessionModel, index: any) => {
          return <OrderCard key={index} {...order} />;
        })}
    </div>
  );
}

export default DiagonsisHome;
