import React from "react";

const Button = (props) => {
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"  onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
