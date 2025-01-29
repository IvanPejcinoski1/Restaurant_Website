import { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { RestaurantContext } from "../context/restaurantContext";

const Favorites = () => {
  const { favorites, handleClick } = useContext(RestaurantContext);
  return (
    <Container fluid>
      <Row className="mx-5">
        <h1 className="text-center pt-3">YOUR FAVORITES RESTAURANTS</h1>
        {favorites.map((fav, index) => (
          <Col lg={4} key={index}>
            {" "}
            <Card
              className=" mx-4 containerBorder text-center my-5 favorites"
              onClick={(e: any) => handleClick(e, fav)}
            >
              <Card.Img
                variant="top"
                src={fav.image}
                className="w-100 imageHeight"
              />
              <i
                className={`${
                  fav.isFavorite ? "fas fa-heart fa-3x" : "far fa-heart fa-3x"
                } ps-4`}
                aria-hidden="false"
                style={{ cursor: "pointer" }}
              />
              <Card.Body
                className="text-start"
                style={{ backgroundColor: "#dddddd", height: "170px" }}
              >
                <Card.Text className="p-0 m-0 fs-5 fw-bold">
                  {fav.slug}
                </Card.Text>
                <Card.Text
                  className="p-0 m-0 fs-5 fw-semibold pb-4"
                  style={{ color: "#198754" }}
                >
                  {fav.restauranttype}
                </Card.Text>
                <Card.Text className="p-0 m-0 fs-5">
                  {fav.rating >= 0 && fav.reviewsList.length >= 1
                    ? "rating - " + fav.rating.toFixed(1)
                    : ""}
                </Card.Text>
                <Card.Text className="p-0 m-0">
                  {+fav.rating || fav.reviewsList.length >= 1
                    ? "based on "
                    : " "}
                  {fav.reviewsList.length !== 0
                    ? fav.reviewsList.length === 1
                      ? fav.reviewsList.length + " review"
                      : fav.reviewsList.length + " reviews"
                    : ""}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Favorites;
