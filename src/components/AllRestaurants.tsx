import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { RestaurantContext } from "../context/restaurantContext";
import RestaurantCard from "./RestaurenatCard";
import { NavLink, useNavigate } from "react-router-dom";

const AllRestaurants = () => {
  const { restaurants } = useContext(RestaurantContext);
  const buttonArray = [
    "canteen",
    "bukka",
    "eatery",
    "seafood",
    "pizza",
    "vegan",
    "pasta",
    "american",
    "japanese",
  ];
  const navigate = useNavigate();

  // Split the restaurants into groups of 5
  const restaurantsGroups = [];
  for (let i = 0; i < restaurants.length; i += 5) {
    restaurantsGroups.push(restaurants.slice(i, i + 5));
  }
  const handleSurprice = () => {
    const randomRestaurant =
      restaurants[Math.floor(Math.random() * restaurants.length - 1)].slug;
    navigate(`/restaurantDetails/${randomRestaurant}`);
  };

  const mostPopularRestaurants = restaurants
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const mostPopularRestaurantsGroups = [];
  for (let i = 0; i < mostPopularRestaurants.length; i += 5) {
    mostPopularRestaurantsGroups.push(mostPopularRestaurants.slice(i, i + 5));
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mx-5 containerBorder text-center">
          <h1 className="text-center my-5">DON'T KNOW WHAT TO EAT?</h1>
          <Button
            className="form-control mb-5 w-25 mx-auto"
            variant="success"
            onClick={handleSurprice}
          >
            Surprice me!
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="mx-5 containerBorder">
          <h1 className="text-center my-3">OUR MOST POPULAR RESTAURANTS</h1>
          {mostPopularRestaurantsGroups.map((group, index) => (
            <Row
              key={index}
              className="mb-3 "
              style={{
                width: `${(group.length / 5) * 100}%`,
              }}
            >
              {group.map((popularRestaurant) => (
                <Col key={popularRestaurant.id}>
                  <RestaurantCard restaurant={popularRestaurant} />
                </Col>
              ))}
            </Row>
          ))}
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="mx-5 containerBorder text-center pb-5">
          <h1 className="text-center my-3 py-3 ">CUISINES</h1>
          {buttonArray.map((buttonName, index) => (
            <NavLink
              to={`/cuisines/${buttonName}`}
              className="px-3 mx-2 fw-semibold button"
              key={index}
            >
              {buttonName}
            </NavLink>
          ))}
        </Col>
      </Row>
      <Row>
        <Col className="mx-5  text-center">
          <h1 className="text-center my-3">ALL RESTAURANTS</h1>
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

export default AllRestaurants;
