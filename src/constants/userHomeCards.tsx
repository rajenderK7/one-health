import { HomeCardProps } from "../components/user/HomeCard";
import { GoNote } from "react-icons/go";
import { RiHospitalLine } from "react-icons/ri";
import { AiFillMedicineBox } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";

const userHomeCards: HomeCardProps[] = [
  {
    title: "Book Appointment",
    description: "Instantly book a an appointment with the best doctors.",
    link: "/user/book-appointment",
    linkText: <GoNote />,
  },
  {
    title: "Book Beds",
    description: "We got you covered in emergency.",
    link: "/user/book-beds",
    linkText: <RiHospitalLine />,
  },
  {
    title: "Book Diagnostics",
    description: "Now DAD - Diagnostics-At-Doorstep.",
    link: "/user/book-diagnostics",
    linkText: <AiFillMedicineBox />,
  },
];

export default userHomeCards;
