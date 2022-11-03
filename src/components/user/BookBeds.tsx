import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import BedCard from "./BedCard";

const BookBeds = () => {
  const bedsQuery = collection(db, "beds");
  const [value, loading] = useCollectionData(bedsQuery);

  return (
    <div>
      <h2>Emergency Bed Booking</h2>
      {loading && <p>loading...</p>}
      {value &&
        value.map((bed: any) => {
          return <BedCard key={bed.uid} {...bed} />;
        })}
    </div>
  );
};

export default BookBeds;
