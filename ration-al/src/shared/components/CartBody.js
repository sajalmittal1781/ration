import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const CartBody = (props) => {

  const auth=useContext(AuthContext);

  const changeHandler = async (event) => {

    // {event.preventDefault();
    // console.log(event);

    

    try {
      // setIsLoading(true);
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
            quantity: event.target.value,
            description: props.description,
            image: props.image,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      // console.log(responseData);
      // setIsLoading(false);
    } catch (err) {
      // setIsLoading(false);
      // setError(err.message || "Something went wrong, please try again.");
    }

  };

  return (
    <tr>
      <td class="py-4">
        <div class="flex items-center">
          <img class="h-16 w-16 mr-4" src={props.image} alt="Product image" />
          <span class="font-semibold">{props.name}</span>
        </div>
      </td>
      <td class="py-4">{props.price}</td>
      <td class="py-4">
        <div class="flex items-center">
        {auth.email!=="admin@admin" && auth.email!=="" && <input
                type="number"
                min="0"
                Value={props.quantity}
                // placeholder={props.quantity}
                onInput={changeHandler}
                className="h-8 w-11 rounded-lg bg-gray-50 border-2"
                
              ></input>}
        </div>
      </td>
      <td class="py-4">{props.tot}</td>
    </tr>
  );
};

export default CartBody;
