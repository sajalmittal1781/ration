import React from "react";
import Navigation from "./shared/Navigation/Navigation";
import contact from "./shared/images/contact-removebg-preview (3).png";
import classNamees from "./contact.module.css";

const Contact = () => {
  return (
    <>
      <div className="mt-10 md:mt-0">
        <div className="md:float-left w-4/6 md:w-max -ml-2 md:ml-12">
          <img src={contact} className={classNamees.image} />
        </div>

        <div className="p-10 ml-10 mr-10 grid grid-row-1 sm:grid-row-2  mt-0 md:grid-row-3 lg:grid-row-3 xl:grid-row-3 gap-5">
          <div className="p-20 bg-gray-50 shadow-2xl -ml-5 md:ml-8 mr-6 md:mr-36  rounded-xl pt-4 text-xl pb-4">
            <h1 className="font-bold">Toll Free No:</h1>
            <h2>8059235623</h2>
          </div>

          <div className="p-20 bg-gray-50 shadow-2xl -ml-5 md:ml-8 mr-6 md:mr-36  rounded-xl pt-4 text-xl pb-4">
            <h1 className="font-bold">Email:</h1>
            <h2>xyz@xyz</h2>
          </div>

          <div className="p-20 bg-gray-50 shadow-2xl -ml-5 md:ml-8 mr-6 md:mr-36  rounded-xl pt-4 text-xl pb-4">
            <h1 className="font-bold">Address:</h1>
            <h2>Sec-10, Main Market </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
