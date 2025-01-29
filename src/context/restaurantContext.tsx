import React, { createContext, useState, useEffect, ReactNode } from "react";
import restaurantData from "../data/db.json";
import { Restaurant } from "../interfaces/interfaces";

interface Props {
  children: ReactNode;
}

interface ContextData {
  restaurants: Restaurant[];
  handleClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    restaurantReturn: Restaurant
  ) => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
  favorites: Restaurant[];
}

export const RestaurantContext = createContext({} as ContextData);

export const RestaurantProvider: React.FC<Props> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("restaurants");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRestaurants(parsedData);
    } else {
      // adding some properties which are not in db.json
      const restaurantsWithFavorite = restaurantData.restaurants.map(
        (restaurant) => {
          let counter = 0;

          for (const review of restaurant.reviewsList) {
            counter += +review.stars;
          }

          const averageStars: number =
            restaurant.reviewsList.length > 0
              ? counter / restaurant.reviewsList.length
              : 0;

          return {
            ...restaurant,
            isFavorite: false,
            rating: +averageStars.toFixed(1),
          };
        }
      );
      setRestaurants(restaurantsWithFavorite);
      localStorage.setItem(
        "restaurants",
        JSON.stringify(restaurantsWithFavorite)
      );
    }
  }, []);

  useEffect(() => {
    setFavorites(restaurants.filter((el) => el.isFavorite === true));
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
  }, [restaurants]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent | any>,
    restaurantReturn: Restaurant
  ) => {
    if (e.target && (e.target as HTMLElement).classList.contains("fa-heart")) {
      e.preventDefault(); // Prevent the default behavior of the Link
      const updatedRestaurants = restaurants.map((restaurant) =>
        restaurant.id === restaurantReturn.id
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant
      );
      setRestaurants(updatedRestaurants);
      localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));
    }
  };

  return (
    <RestaurantContext.Provider
      value={{ restaurants, handleClick, setRestaurants, favorites }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
