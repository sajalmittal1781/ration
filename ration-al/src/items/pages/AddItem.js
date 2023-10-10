import React, { useState, useRef } from "react";
import Navigation from "../../shared/Navigation/Navigation";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";
import Button from "../../shared/components/Button";

const AddItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const nameRef = useRef("");
  const imageRef = useRef("");

  const descriptionRef = useRef("");
  const priceRef = useRef("");

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch("https://ration.onrender.com/api/items/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          price: priceRef.current.value,
          image: imageRef.current.value,
        }),
      });

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
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />

      {/* <Navigation /> */}
      {isLoading && <LoadingSpinner asOverlay />}

      <form onSubmit={submitHandler} className="mr-64 ml-64 mt-4">
        <h1 className="font-large leading-tight text-2xl mt-0 mb-2 text-blue-600">
          Item Details
        </h1>
        <label className="font-small leading-tight text-2xl mt-0 mb-2 text-gray-600">
          Name
        </label>
        <input
          type="text"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          ref={nameRef}
        />
        <br></br>

        <label className="font-small leading-tight text-2xl mt-0 mb-2 text-gray-600">
          Description
        </label>
        <input
          type="text"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          ref={descriptionRef}
        />
        <br></br>

        <label className="font-small leading-tight text-2xl mt-0 mb-2 text-gray-600">
          Price
        </label>

        <input
          type="number"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          ref={priceRef}
        />

        <br></br>

        <label className="font-small leading-tight text-2xl mt-0 mb-2 text-gray-600">
          Image
        </label>
        <input
          type="text"
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          ref={imageRef}
        />
        <br></br>

        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default AddItem;
