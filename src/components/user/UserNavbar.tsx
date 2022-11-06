import { useContext } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import { logout } from "../../lib/firebase";

const UserNavbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Navbar className="mx-auto shadow mb-4">
    <Container>
      <Navbar.Brand onClick={handleHome} style={{ cursor: "pointer" }}>
        <b>One-Health</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="float-end">
          <NavDropdown title={user?.displayName} id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default UserNavbar;
