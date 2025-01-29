import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

const Footer = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="borderTop mx-5 mt-5">
          <p className="fs-3 text-center my-4 fw-semibold ">
            Copyright &copy; 2025
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default Footer;
