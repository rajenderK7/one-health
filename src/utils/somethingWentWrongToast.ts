import { toast } from "react-hot-toast";

export const somethingWentWrong = (error: any) => {
  toast(error ?? "Something went wrong..");
};
