import React, { useRef, useContext, useState, useNavigate } from "react";
import Button from "../../shared/components/Button";
import Navigation from "../../shared/Navigation/Navigation";
import { AuthContext } from "../../shared/context/AuthContext";
import { Link } from "react-router-dom";

const Logout = () => {
  const auth = useContext(AuthContext);
  try {
    auth.logout();
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <div className="grid h-screen place-items-center">
      <div>LOGOUT SUCCESSFULL</div>
      <Button>
        {" "}
        <Link to="/">Back To Home</Link>
      </Button>

      </div>
    </>
  );
};

export default Logout;
