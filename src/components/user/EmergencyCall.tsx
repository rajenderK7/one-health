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
    return `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=17.5370841,78.3844623&destinations=${lat},${long}&departure_time=now&key=oEKfqegbqDJlftnh40ElraARvOJ9b`;
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
      console.log(data, data.rows["0"].elements["0"].distance.value,);
      const distanceObj = {
        ...hospital,
        distance: data.rows["0"].elements["0"].distance.value,
      };
      if (distanceObj.distance <= leastDistance) {
        setNearestHospital(distanceObj.phone)
        setLeastDistance(distanceObj);
      }
    });
  };

  useEffect(() => {
    // get the users location
    if(origin[0]===""){
      getLocation();
    }
  }, []);

  useEffect(() => {
      console.log("origin length", origin.length, origin);
      fetchDistances();
  }, [origin]);

  console.log(origin);

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
            onClick={() => console.log(nearestHospital)}
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
