import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RestaurantContext } from "../context/restaurantContext";
import { Restaurant } from "../interfaces/interfaces"; // Import the correct type
import RestaurantCard from "./RestaurenatCard";

const Cuisines = () => {
  const { restauranttype } = useParams();
  const { restaurants } = useContext(RestaurantContext);

  let filteredRestaurants: Restaurant[] = [];

  if (restauranttype) {
    filteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.restauranttype === restauranttype;
    });
  }
  const restaurantsGroups = [];
  for (let i = 0; i < filteredRestaurants.length; i += 5) {
    restaurantsGroups.push(filteredRestaurants.slice(i, i + 5));
  }

  return (
    <Container fluid>
      <Row className="py-3">
        <Col className="mx-5 containerBorder text-center ">
          <h1 className="pb-4">{restauranttype?.toUpperCase()} RESTAURANTS</h1>
          {restaurantsGroups.map((group, index) => (
            <Row
              key={index}
              className="mb-3 "
              style={{
                width: `${(group.length / 5) * 100}%`,
              }}
            >
              {group.map((restaurant) => (
                <Col key={restaurant.id}>
                  <RestaurantCard restaurant={restaurant} />
                </Col>
              ))}
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Cuisines;
