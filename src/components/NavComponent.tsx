import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart } from "react-icons/fa";

const NavComponent = () => {
  return (
    <Navbar>
      <Container fluid>
        <Nav className="justify-content-between w-100 containerBorder mx-5">
          <Nav.Link as={NavLink} to="/" className="fw-bold fs-4 mb-3">
            RESTAURANT
          </Nav.Link>

          <Nav.Link as={NavLink} to="/favorites" className="fs-2">
            <FaHeart className="colorRed" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavComponent;
