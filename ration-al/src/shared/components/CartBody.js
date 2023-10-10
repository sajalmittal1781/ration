import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const CartBody = (props) => {

  const auth=useContext(AuthContext);

  return (
    <tr>
      <td className="py-4">
        <div className="flex items-center">
          <img className="h-16 w-16 mr-4" src={props.image} alt="Product image" />
          <span className="font-semibold">{props.name}</span>
        </div>
      </td>
      <td className="py-4">{props.price}</td>
      <td className="py-4">
        <div className="flex items-center">
        {auth.email!=="admin@admin" && auth.email!=="" && <input
                type="number"
                min="0"
                value={props.quantity}
                onChange={(e) =>  props.changeHandler(props.id,Number(e.target.value))}
                className="h-8 w-11 rounded-lg bg-gray-50 border-2"
                
              ></input>}
        </div>
      </td>
      <td className="py-4">{props.tot}</td>
    </tr>
  );
};

export default CartBody;
