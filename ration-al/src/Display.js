import React from "react";
import image from "./shared/images/image.png";
import { Link } from "react-router-dom";
import Button from "./shared/components/Button";
import Navigation from "./shared/Navigation/Navigation";
import classes from "./Display.module.css";

const Display = () => {
  return (
    <>
      <div className="display-flex">
      <div className=" float-left   md:h-max w-4/6 md:w-2/5 -ml-2 md:ml-8	">
        <img src={image}  className={classes.image} />
      </div>

      <div className="  float-right p-7 max-w-sm ml-10 mt-8 md:mt-36 mr-10 md:mr-20 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            NAMASTE 🙏
          </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Welcome to our online store from which now you can directly order from
          home with ease and get your order delivered at your home.
        </p>
      </div>
      </div>
    </>
  );
};

export default Display;
