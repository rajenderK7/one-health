import HomeCard from "./HomeCard";
import Container from "react-bootstrap/Container";
import userHomeCards from "../../constants/userHomeCards";
import MyAppointments from "./MyAppointments"
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
    </Container>
  );
};

export default UserHome;
