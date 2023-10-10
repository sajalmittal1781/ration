import React, { useState, useEffect, useContext } from "react";
import CartCard from "../../shared/components/CartCard";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";
import { AuthContext } from "../../shared/context/AuthContext";
import Navigation from "../../shared/Navigation/Navigation";
const TotalAmount = () => {
    const auth=useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedItems, setLoadedItems] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ration.onrender.com/api/items/amount/${auth.userId}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedItems(responseData);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <Navigation />
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedItems && (
        <div>
          <ul>
            {loadedItems.map((item) => (
              <div>{loadedItems}</div>
            ))}
          </ul>
        </div>
      )}
      
    </>
  );
};

export default TotalAmount;
