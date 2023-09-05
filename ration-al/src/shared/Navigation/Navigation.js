import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { AuthContext } from "../context/AuthContext";
import Navlinks from "./Navlinks";

const Navigation = () => {
  const auth = useContext(AuthContext);
  const [navbar, setNavbar] = useState(false);

  return (
    <>
      <nav class="bg-white dark:bg-gray-900   w-full z-20 top-0 left-0 border-gray-200 dark:border-gray-600">
        <div class="container  flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" class="flex items-center">
            <img src={logo} class="mr-0 h-14 md:h-20" alt="Logo" />
            <span class="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Ration-AL Store
            </span>
          </Link>
          <div class="flex md:order-2">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-4 py-2 text-center mr-0 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {!auth.isLoggedIn ? (
                <Link to="/login">LOGIN/SIGNUP</Link>
              ) : (
                <Link to="/logout">LOGOUT</Link>
              )}
            </button>

            <div className=" flex flex-wrap md:hidden">
              <button
                className="mr-1 p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            class={`items-center justify-between  w-full md:flex md:w-auto md:order-1 ${
              navbar ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <Navlinks />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
