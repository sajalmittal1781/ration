import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navlinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
          }
        >
          Home
        </NavLink>
      </li>
      <li>

        <NavLink
          to="/items"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blur-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
          }
        >
          Items
        </NavLink>
      </li>

      {auth.isLoggedIn && (
        <li>
          {!auth.email.localeCompare("admin@admin") ? (
            <NavLink to={"/addItem"} className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} 
              border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent
               lg:border-0 hover:text-orange-700 lg:p-0`
            }>Add Item</NavLink>
          ) : (
            <NavLink to={`/usercart/${auth.userId}`} className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} 
              border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent
               lg:border-0 hover:text-orange-700 lg:p-0`
            }>Cart</NavLink>
          )}
        </li>
      )}

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} 
            border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent
             lg:border-0 hover:text-orange-700 lg:p-0`
          }
        >
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default Navlinks;
