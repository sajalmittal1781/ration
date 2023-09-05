import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navlinks = () => {
  const auth = useContext(AuthContext);
  return (
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a
          href="#"
          class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
          aria-current="page"
        >
          <Link to="/">Home</Link>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >
          {" "}
          <Link on to={"/items"}>
            Items
          </Link>
        </a>
      </li>
      {auth.isLoggedIn && (
        <li>
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            {!auth.email.localeCompare("admin@admin") ? (
              <Link to={"/addItem"}>Add Item</Link>
            ) : (
              <Link to={`/usercart/${auth.userId}`}>Cart</Link>
            )}
          </a>
        </li>
      )}

      <li>
        <a
          href="#"
          class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >
          <Link to="/contact">Contact</Link>
        </a>
      </li>
    </ul>
  );
};

export default Navlinks;
