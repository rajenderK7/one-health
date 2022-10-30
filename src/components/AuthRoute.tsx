import React, { useContext } from "react";
import UserContext from "../context/userContext";

const AuthRoute = () => {
  const { user } = useContext(UserContext);
  console.log(user?.displayName);

  //   console.log(role === 1);

  return <div>AuthRoute</div>;
};

export default AuthRoute;
