import "./App.css";
import NavComponent from "./components/NavComponent";
import AllRestaurants from "./components/AllRestaurants";
import { RestaurantProvider } from "./context/restaurantContext";
import { Route, Routes } from "react-router-dom";
import Cuisines from "./components/Cuisines";
import "@fortawesome/fontawesome-free/css/all.css";
import RestaurantDetail from "./components/RestaurantDetail";
import Footer from "./components/Footer";
import Favorites from "./components/Favorites";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="App">
      <RestaurantProvider>
        <ScrollToTop />
        <NavComponent />
        <main>
          <Routes>
            <Route path="/" element={<AllRestaurants />} />
            <Route path="/cuisines/:restauranttype" element={<Cuisines />} />
            <Route
              path="/restaurantDetails/:slug"
              element={<RestaurantDetail />}
            />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </RestaurantProvider>
    </div>
  );
};

export default App;
