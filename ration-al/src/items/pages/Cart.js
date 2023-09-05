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

  const [loadedItems, setLoadedItems] = useState();

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `https://ration.onrender.com/api/items/usercart/${auth.userId}`
  //       );

  //       const responseData = await response.json();

  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }

  //       setLoadedItems(responseData.items);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   };
  //   sendRequest();
  // }, []);

  useEffect(() => {

    const interval=setInterval(()=>{
      const sendRequest = async () => {
        // setIsLoading(true);
        try {
          const response = await fetch(
            `https://ration.onrender.com/api/items/usercart/${auth.userId}`
          );
  
          const responseData = await response.json();
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
  
          setLoadedItems(responseData.items);
        } catch (err) {
          setError(err.message);
        }
        // setIsLoading(false);
      };
      sendRequest();
    },1000)
  }, []);

  // console.log(loadedItems);

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `https://ration.onrender.com/api/items/amount/${auth.userId}`
  //       );

  //       const responseData = await response.json();

  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }

  //       setAmount(responseData.amount);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   };
  //   sendRequest();
  // }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      const sendRequest = async () => {
        // setIsLoading(true);
        // console.log("Re");

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
        // setIsLoading(false);
      };
      sendRequest();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  // console.log(loadedItems[2].quantity);
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <div class="bg-white h-screen py-8">
        <div class="container mx-auto px-4">
          <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-3/4">
              <div class="bg-white rounded-lg shadow-xl p-6 mb-4">
                <table class="w-full">
                  <thead>
                    <tr>
                      <th class="text-left font-semibold">Product</th>
                      <th class="text-left font-semibold">Price</th>
                      <th class="text-left font-semibold">Quantity</th>
                      <th class="text-left font-semibold">Total</th>
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
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="md:w-1/4">
              <div class="bg-white rounded-lg shadow-2xl p-6">
                <h2 class="text-lg font-semibold mb-4">Summary</h2>
                <div class="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${amount}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>$0.00</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <hr class="my-2" />
                <div class="flex justify-between mb-2">
                  <span class="font-semibold">Total</span>
                  <span class="font-semibold">${amount}</span>
                </div>
                <button class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
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
