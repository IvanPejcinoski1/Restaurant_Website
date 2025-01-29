import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { ReviewInterface } from "../interfaces/interfaces";

interface Props {
  reviewData: ReviewInterface;
}
const Review = ({ reviewData }: Props) => {
  return (
    <div
      className="mx-5 text-start "
      style={{ backgroundColor: "#dddddd", borderRadius: "10px" }}
    >
      <p className="ps-3 fw-bold pt-2">
        Author: <span className="fw-normal">{reviewData.author}</span>
      </p>
      <p className="ps-3 fw-bold">
        Message: <span className="fw-normal">{reviewData.comment}</span>
      </p>
      <p className="ps-3 fw-bold pb-2">
        Stars: <span className="fw-normal">{reviewData.stars}</span>
      </p>
    </div>
  );
};
export default Review;
