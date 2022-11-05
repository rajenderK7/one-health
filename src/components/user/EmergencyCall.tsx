import "./EmergencyCall.css";
import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";

const EmergencyCall = () => {
  const handleCallClick = () => {};
  const [origin, setOrigin] = useState(["", ""]);
  const [leastDistance, setLeastDistance] = useState(Infinity);
  const [nearestHospital, setNearestHospital] = useState({} as any);
  const hospitals: any[] = [
    {
      name: "KIMS Secunderabad",
      lat: "17.4371",
      long: "78.4830",
      location: "Secunderabad",
      phone: "+919959157455",
    },
    {
      name: "AIG Hospitals",
      lat: "17.4431",
      long: "78.3661",
      location: "Gachibowli",
      phone: "+919441353600",
    },
    {
      name: "Kamineni Hospitals",
      lat: "17.3523",
      long: "78.5551",
      location: "LB Nagar",
      phone: "+919959157455",
    },
    {
      name: "Aakar Asha Hospital",
      lat: "17.4893",
      long: "78.4080",
      location: "Kukatpally",
      phone: "+919441353600",
    },
  ];

  const apiEndpoint = (lat: string, long: string) => {
    return `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin[0]},${origin[1]}&destinations=${lat},${long}&departure_time=now&key=oEKfqegbqDJlftnh40ElraARvOJ9b`;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSetLocation);
    }
  };

  const handleSetLocation = (position: any) => {
    setOrigin([position.coords.latitude, position.coords.longitude]);
  };

  const fetchDistances = async () => {
    hospitals.forEach(async (hospital) => {
      const res = await axios.get(apiEndpoint(hospital.lat, hospital.long));
      const data = res.data;
      const distanceObj = {
        ...hospital,
        distance: data.rows["0"].elements["0"].distance.value,
      };
      // console.log(distanceObj.distance);
      if (distanceObj.distance <= leastDistance) {
        setLeastDistance(distanceObj.distance);
        setNearestHospital(distanceObj.phone);
      }
    });
  };

  useEffect(() => {
    // get the users location
    getLocation();
  }, []);

  useEffect(() => {
    fetchDistances();
  }, [origin]);
  // console.log(nearestHospital);

  return (
    <div
      className="position-absolute text-right floating-action-menu"
      style={{ bottom: "10px", right: "10px" }}
    >
      <div className="d-block action-button">
        <button
          onClick={handleCallClick}
          className="btn-floating btn-primary rounded"
        >
          <h1
            onClick={() => console.log(nearestHospital.phone)}
            className="fas fa-plus"
          >
            <a
              style={{ textDecoration: "none" }}
              href={`tel:${nearestHospital.phone ?? "+NA"}`}
            >
              <FiPhoneCall />
            </a>
          </h1>
        </button>
      </div>
    </div>
  );
};

export default EmergencyCall;
