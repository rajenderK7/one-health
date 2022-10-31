import HomeCard, { HomeCardProps } from "./HomeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userHomeCards from "../../constants/userHomeCards";

const ex: HomeCardProps = {
  title: "Book Appointment",
  description: "import 'bootstrap/dist/css/bootstrap.min.css';",
  link: "/user/book-appointment",
  linkText: "->",
};

const UserHome = () => {
  return (
    <Container>
      <div className="d-flex">
        {userHomeCards.map((card, index) => {
          return <HomeCard key={index} {...card} />;
        })}
      </div>
    </Container>
  );
};

export default UserHome;
