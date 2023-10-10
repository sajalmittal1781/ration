import React, { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";
import { AuthContext } from "../context/AuthContext";

const ItemCard = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState(props.quan===0);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://ration.onrender.com/api/items/cart/${auth.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item_id: props.id,
            name: props.title,
            price: props.price,
            quantity: event.target[0].value,
            description: props.description,
            image: props.image,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again.");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  const changeHandler=(event)=>{
    if(event.target.value==="0"){
      setDisabled(true);
    }
    else{
      setDisabled(false);
    }

  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}

      <div className="max-w-xs bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <img
          className="p-9 h-64 rounded-t-lg"
          src={props.image}
          alt="product image"
        />
        <form onSubmit={submitHandler}>
          <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {props.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {props.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {props.price}
              </span>

              {auth.email!=="admin@admin" && auth.email!=="" && <input
                type="number"
                min="0"
                Value={props.quan}
                onChange={changeHandler}
                className="h-8 w-11 rounded-lg bg-gray-50 border-2"
              ></input>}

              {auth.email!=="admin@admin" && auth.email!=="" && <button
                type="submit"
                disabled={disabled}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </button>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItemCard;
