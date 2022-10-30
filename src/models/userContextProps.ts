import { User } from "firebase/auth";

export default interface UserContextProps {
  user: User | null | undefined;
  username: String | null | undefined;
  role: number | undefined;
}
