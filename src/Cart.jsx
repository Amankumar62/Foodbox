import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Cart = () => {
  const {
    cartData,
    totalDeliveryTime,
    totalPrice,
    setApplyCoupon,
    applyCoupon
  } = useContext(CartContext);

  const notify = () =>
    toast.success("Yay! Rs 5 Coupon Applied", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2>Cart</h2>
      <h3>Total Delivery Time: {totalDeliveryTime} Mins</h3>
      {applyCoupon ? (
        <h3>Total Price: Rs {totalPrice} Yay! Coupon applied</h3>
      ) : (
        <h3>Total Price: Rs {totalPrice}</h3>
      )}
      <button
        onClick={() => {
          setApplyCoupon(true);
          notify();
        }}
        disabled={cartData.length === 0 || applyCoupon}
      >
        Apply Coupon
      </button>
      <ul>
        {cartData.map(
          ({ id, name, description, price, delivery_time, image }) => (
            <li key={id}>
              <img src={image} alt={name} />
              <section>
                <p>Name: {name}</p>
                <p className="description">
                  <b>Description:</b>
                  {description}
                </p>
                <p>Price: {price}</p>
                <p>Delivery Time: {delivery_time}</p>
              </section>
            </li>
          )
        )}
      </ul>
    </>
  );
};
