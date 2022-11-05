import HomeCard from "./HomeCard";
import Container from "react-bootstrap/Container";
import userHomeCards from "../../constants/userHomeCards";
import MyAppointments from "./MyAppointments";
import EmergencyCall from "./EmergencyCall";
const UserHome = () => {
  return (
    <Container>
      <MyAppointments />
      <h2 className="mt-3">Services</h2>
      <div className="d-flex flex-wrap justify-content-between">
        {userHomeCards.map((card, index) => {
          return <HomeCard key={index} {...card} />;
        })}
      </div>
      <EmergencyCall />
    </Container>
  );
};

export default UserHome;
