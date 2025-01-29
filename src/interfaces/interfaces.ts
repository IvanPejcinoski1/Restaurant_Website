export interface Restaurant {
  parkinglot: boolean;
  phone: string;
  image: string;
  isFavorite: boolean;
  restauranttype: string;
  businessname: string;
  address: string;
  slug: string;
  email: string;
  id: string | number;
  rating: number;
  reviewsList: ReviewInterface[]; // Array of reviews
}
export interface ReviewInterface {
  id: string | number;
  author: string;
  comment: string;
  stars: number;
}
