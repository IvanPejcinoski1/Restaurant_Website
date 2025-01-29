import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { RestaurantContext } from "../context/restaurantContext";
import { Restaurant, ReviewInterface } from "../interfaces/interfaces";
import Review from "./Review";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const RestaurantDetail = () => {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    stars: 0,
    id: "",
  });

  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const { slug } = useParams();

  let clickedRestaurant: Restaurant | undefined;
  if (slug) {
    clickedRestaurant = restaurants.find(
      (restaurant) => restaurant.slug === slug
    );
  }
  const handleForm = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReview: ReviewInterface = {
      id: uuidv4(), // Generate unique ID for the new review
      author: formData.name,
      comment: formData.comment,
      stars: +formData.stars,
    };

    const newRating =
      +(
        clickedRestaurant!.rating * clickedRestaurant!.reviewsList.length +
        +formData.stars
      ) /
      (clickedRestaurant!.reviewsList.length + 1);

    // Optimistically update the UI
    setRestaurants(
      restaurants.map((restaurant) =>
        restaurant.id === clickedRestaurant!.id
          ? {
              ...restaurant,
              reviewsList: [...restaurant.reviewsList, newReview],
              rating: newRating,
            }
          : restaurant
      )
    );

    // Reset the form after submission
    setFormData({
      name: "",
      comment: "",
      stars: 0,
      id: "",
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={8}>
          {clickedRestaurant && (
            <>
              {" "}
              <h1 className="text-center py-3">
                {clickedRestaurant?.slug.toUpperCase()}
              </h1>
              <Card className=" ms-5  containerBorder text-center ">
                <Card.Img
                  variant="top"
                  src={clickedRestaurant.image}
                  className="w-100 imageHeightDetails"
                />
                <Card.Body
                  className="text-start"
                  style={{ backgroundColor: "#dddddd" }}
                >
                  <Card.Text className="p-0 m-0 fs-5">
                    {clickedRestaurant.rating >= 0 &&
                    clickedRestaurant.reviewsList.length >= 1
                      ? "rating- " + clickedRestaurant.rating.toFixed(1)
                      : ""}
                  </Card.Text>
                  <Card.Text className="p-0 m-0">
                    {+clickedRestaurant.rating ||
                    clickedRestaurant.reviewsList.length >= 1
                      ? "based on "
                      : " "}
                    {clickedRestaurant.reviewsList.length !== 0
                      ? clickedRestaurant.reviewsList.length === 1
                        ? clickedRestaurant.reviewsList.length + " review"
                        : clickedRestaurant.reviewsList.length + " reviews"
                      : ""}
                  </Card.Text>
                  <Card.Title className="py-2">
                    {clickedRestaurant.phone}
                  </Card.Title>
                  <Card.Text className="py-0 my-1">
                    {clickedRestaurant.email}
                  </Card.Text>
                  <Card.Text className="py-0 my-1">
                    {clickedRestaurant.address}
                  </Card.Text>
                  <Card.Text className="py-0 my-1">
                    {clickedRestaurant.parkinglot &&
                      "We have a parking lot waiting for you"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
          <Row>
            <Col className="text-center mt-5 mx-auto" lg={8}>
              <h1>REVIEW FORM</h1>
              <form action="" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name" className="py-2">
                  Name
                </label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => handleForm(e)}
                />
                <label htmlFor="comments" className="py-2">
                  Comment
                </label>
                <br />
                <textarea
                  name="comment"
                  id="comment"
                  value={formData.comment}
                  className="form-control"
                  onChange={(e) => handleForm(e)}
                ></textarea>
                <label htmlFor="" className="py-2">
                  Stars
                </label>
                <br />
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < formData.stars ? (
                      <FaStar
                        size={35}
                        className="mx-1 mb-3"
                        onClick={() => {
                          setFormData({ ...formData, stars: i + 1 });
                        }}
                        style={{ cursor: "pointer", color: "gold" }}
                      />
                    ) : (
                      <CiStar
                        size={35}
                        className="mx-1 mb-3"
                        onClick={() => {
                          setFormData({ ...formData, stars: i + 1 });
                        }}
                        style={{ cursor: "pointer", color: "gray" }}
                      />
                    )}
                  </span>
                ))}

                <Button
                  type="submit"
                  className="form-control buttonSubmit"
                  disabled={!formData.comment || !formData.name}
                >
                  Leave a review
                </Button>
              </form>
            </Col>
          </Row>
        </Col>
        <Col className="text-center py-3" lg={4}>
          <h1 className="text-center my-5 pt-4">REVIEWS</h1>
          {clickedRestaurant &&
            clickedRestaurant.reviewsList.length > 0 &&
            clickedRestaurant.reviewsList.map((review, index) => (
              <Review reviewData={review} key={index} />
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantDetail;
