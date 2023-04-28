import "./styles.css";
import { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { Home } from "./Home";
import { Menu } from "./Menu";
import { Cart } from "./Cart";
import { Error } from "./Error";

export default function App() {
  const { cartData } = useContext(CartContext);
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/cart">Cart({cartData.length})</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}
