import { useContext, useState } from "react";
import { FoodContext } from "./context/FoodContext";
import { CartContext } from "./context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Menu = () => {
  const {
    foodData
    // displayData,
    // searchHandler,
    // setCheckSpicy,
    // setCheckVeg,
    // checkSpicy,
    // checkVeg,
    // sortingMenu
  } = useContext(FoodContext);
  const notify = (itemName) =>
    toast.success(`Yay! ${itemName} Added to Cart`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });

  const [filters, setFilters] = useState({
    checkbox: [],
    searchQuery: "",
    sort: null
  });

  const searchHandler = (event) => {
    const query = event?.target?.value.toLowerCase().trim();
    setFilters({ ...filters, searchQuery: query });
  };

  const sortingOrder = (order) => {
    return order === "ascending"
      ? (a, b) => a.price - b.price
      : (a, b) => b.price - a.price;
  };

  const checkBoxHandler = (event) => {
    filters.checkbox.find((checks) => checks === event.target.value)
      ? setFilters({
          ...filters,
          checkbox: filters.checkbox.filter(
            (item) => item !== event.target.value
          )
        })
      : setFilters({
          ...filters,
          checkbox: [...filters.checkbox, event.target.value]
        });
  };
  const sortHandler = (event) => {
    setFilters({ ...filters, sort: event.target.value });
  };

  const checkVegSpicy = foodData.filter((item) =>
    filters.checkbox.every((check) => item[check])
  );

  const searchResult = checkVegSpicy.filter(({ name }) =>
    name.toLowerCase().includes(filters.searchQuery)
  );

  const displayData = filters.sort
    ? searchResult.sort(sortingOrder(filters.sort))
    : searchResult;

  const { addToCartHandler, containsItem } = useContext(CartContext);

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
      <section>
        <h3>Filters:</h3>
        <input
          type="text"
          placeholder="Search Food here"
          onChange={searchHandler}
        />
        <label>
          <input
            type="checkbox"
            value="is_vegetarian"
            onChange={checkBoxHandler}
          />
          Veg
        </label>
        <label>
          <input type="checkbox" value="is_spicy" onChange={checkBoxHandler} />
          Spicy
        </label>
        <label>
          <input
            type="radio"
            value="ascending"
            name="sort"
            onChange={sortHandler}
          />
          Sort(price) Low to High
        </label>
        <label>
          <input
            type="radio"
            value="descending"
            name="sort"
            onChange={sortHandler}
          />
          Sort(price) High to Low
        </label>
      </section>
      <section>
        <h3>Menu</h3>
        <ul>
          {displayData.map((menuItem) => {
            const {
              id,
              name,
              description,
              price,
              image,
              delivery_time
            } = menuItem;
            return (
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
                  <button
                    onClick={() => {
                      addToCartHandler(menuItem);
                      notify(name);
                    }}
                    disabled={containsItem(id)}
                  >
                    Add to Cart
                  </button>
                </section>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
