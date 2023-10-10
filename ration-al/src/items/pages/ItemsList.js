import React, { useContext, useEffect, useState } from "react";

import ItemCard from "../../shared/components/ItemCard";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";
import { AuthContext } from "../../shared/context/AuthContext";

const ItemsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedItems, setLoadedItems] = useState();
  const auth = useContext(AuthContext);
  const [log, setLog] = useState(auth.isLoggedIn);
  const [quantity, setQuantity] = useState(0);
  const [loadedUserItems, setLoadedUserItems] = useState();
  const [lloadedItems, setLloadedItems] = useState();

  useEffect(() => {
    if (log) {
    const sendRequest = async () => {
      
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://ration.onrender.com/api/items/usercart/${auth.userId}`
          );

          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(responseData.message);
          }

          setLloadedItems(responseData.items);
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }
      sendRequest();
    };
  }, []);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://ration.onrender.com/api/items");

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedItems(responseData.items);
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

  const mapping = new Map();

  if (auth.isLoggedIn && lloadedItems && loadedItems) {
    loadedItems.map((item) => {
      lloadedItems.map((iteem) => {
        if (iteem._id === item.id) {
          mapping.set(item.id, iteem.quantity);
        }
      });
    });

  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedItems && (
        <ul>
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {loadedItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.name}
                price={item.price}
                description={item.description}
                quan={mapping.get(item.id) ? mapping.get(item.id) : 0}
              />
            ))}
          </div>
        </ul>
      )}
    </React.Fragment>
  );
};

export default ItemsList;
