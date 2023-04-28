import { createContext, useState, useEffect } from "react";
import { fakeFetch } from "../fakeFetch";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodData, setFoodData] = useState([]);
  // const [displayData, setDisplayData] = useState([]);
  // const [checkSpicy, setCheckSpicy] = useState(false);
  // const [checkVeg, setCheckVeg] = useState(false);

  const getFoodData = async () => {
    try {
      const { status, data } = await fakeFetch("https://example.com/api/menu");
      if (status === 200) {
        setFoodData(() => data.menu);
        // setDisplayData(() => data.menu);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFoodData();
  }, []);

  // useEffect(() => {
  //   searchHandler();
  // }, [checkVeg, checkSpicy]);

  // const searchHandler = (event) => {
  //   let query =
  //     event?.target?.value.length > 0
  //       ? event.target.value.toLowerCase().trim()
  //       : "";
  //   if (checkSpicy && checkVeg) {
  //     setDisplayData(() =>
  //       foodData.filter(
  //         ({ name, is_spicy, is_vegetarian }) =>
  //           name.toLowerCase().includes(query) && is_spicy && is_vegetarian
  //       )
  //     );
  //   } else if (checkSpicy) {
  //     setDisplayData(() =>
  //       foodData.filter(
  //         ({ is_spicy, name }) => is_spicy && name.toLowerCase().includes(query)
  //       )
  //     );
  //   } else if (checkVeg) {
  //     setDisplayData(() =>
  //       foodData.filter(
  //         ({ is_vegetarian, name }) =>
  //           is_vegetarian && name.toLowerCase().includes(query)
  //       )
  //     );
  //   } else {
  //     setDisplayData(() =>
  //       foodData.filter(({ name }) => name.toLowerCase().includes(query))
  //     );
  //   }
  // };

  // const sortingMenu = (event) => {
  //   if (event.target.value === "ascending") {
  //     setDisplayData(() => [...displayData].sort((a, b) => a.price - b.price));
  //   } else {
  //     setDisplayData(() => [...displayData].sort((a, b) => b.price - a.price));
  //   }
  // };

  return (
    <FoodContext.Provider
      value={{
        foodData
        // displayData
        // searchHandler,
        // setCheckSpicy,
        // setCheckVeg,
        // checkVeg,
        // checkSpicy,
        // sortingMenu
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
