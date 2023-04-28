import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <>
      <h1>Welcome to neog Food Ordering App</h1>
      <Link to="/menu">
        <button>Order Food</button>
      </Link>
    </>
  );
};
