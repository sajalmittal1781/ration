import React, { useState, useEffect, useContext } from "react";
import CartCard from "../../shared/components/CartCard";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";
import { AuthContext } from "../../shared/context/AuthContext";
import Navigation from "../../shared/Navigation/Navigation";
import { Link } from "react-router-dom";
import ItemCard from "../../shared/components/ItemCard";
import CartBody from "../../shared/components/CartBody";
const Cart = () => {
  const auth = useContext(AuthContext);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedItems, setLoadedItems] = useState([]);
  const [change, setChange] = useState(true);


  const changeHandler = async (id, newquantity) => {
    try {
      const response = await fetch(
        `https://ration.onrender.com/api/items/cart/${auth.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item_id: id,
            quantity: newquantity,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setChange(!change)
    } catch (err) {
      setError(err.message || "Something went wrong, please try again.");
    }

  };

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ration.onrender.com/api/items/usercart/${auth.userId}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        const finalitems = responseData.items;
        const display = finalitems.filter((item) => item.quantity !== 0);


        setLoadedItems(display);

      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [change]);


  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `https://ration.onrender.com/api/items/amount/${auth.userId}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setAmount(responseData.amount);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [change]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <div className="bg-white h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-xl p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading &&
                      loadedItems &&
                      loadedItems.map((item) => (
                        <CartBody
                          id={item._id}
                          name={item.name}
                          price={item.price}
                          quantity={item.quantity}
                          image={item.image}
                          tot={parseInt(item.quantity) * parseInt(item.price)}
                          changeHandler={changeHandler}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${amount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${amount}</span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
