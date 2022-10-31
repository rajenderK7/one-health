import { createContext } from "react";
import UserContextProps from "../models/userContextProps";

const defaultContext: UserContextProps = {
  user: null,
  role: -1,
};

const UserContext = createContext(defaultContext);

export default UserContext;
