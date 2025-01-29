import React, { useContext } from "react";
import { Card, CardText } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Restaurant } from "../interfaces/interfaces";
import { RestaurantContext } from "../context/restaurantContext";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: Props) => {
  const { handleClick } = useContext(RestaurantContext);

  return (
    <Card className="cardSize ">
      <Link
        to={`/restaurantDetails/${restaurant.slug}`}
        className="text-decoration-none text-black Image"
        onClick={(e) => handleClick(e, restaurant)}
      >
        <Card.Img variant="top" src={restaurant.image} className="img" />
        <i
          className={
            restaurant.isFavorite ? "fas fa-heart fa-3x" : "far fa-heart fa-3x"
          }
          aria-hidden="false"
        />
        <Card.Body
          className="text-start cardBody "
          style={{ backgroundColor: "#dddddd" }}
        >
          <Card.Title className="fw-bold">{restaurant.slug}</Card.Title>
          <Card.Text className="text-success fw-semibold">
            {restaurant.restauranttype}
          </Card.Text>
          <CardText className="p-0 m-0 fs-5">
            {restaurant.rating >= 0 && restaurant.reviewsList.length >= 1
              ? "rating -" + restaurant.rating.toFixed(1)
              : ""}
          </CardText>
          <CardText className="p-0 m-0">
            {+restaurant.rating || restaurant.reviewsList.length >= 1
              ? "based on "
              : " "}
            {restaurant.reviewsList.length !== 0
              ? restaurant.reviewsList.length === 1
                ? restaurant.reviewsList.length + " review"
                : restaurant.reviewsList.length + " reviews"
              : ""}
          </CardText>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default RestaurantCard;
