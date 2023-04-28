import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { FoodProvider } from "./context/FoodContext";
import { CartProvider } from "./context/CartContext";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <FoodProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FoodProvider>
    </Router>
  </StrictMode>
);
