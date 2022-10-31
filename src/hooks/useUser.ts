import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";

const useUser = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState<number>();

  useEffect(() => {
    let unsubscribe;

    if (user) {
      try {
        unsubscribe = onSnapshot(doc(db, "users", user?.uid), (doc) => {
          if (doc.exists()) {
            const role = doc.data()?.role;
            setRole(role);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    return unsubscribe;
  }, [user]);
  return { user, role };
};

export default useUser;
