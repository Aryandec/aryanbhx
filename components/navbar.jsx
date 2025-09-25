import Link from "next/link";
import { FaBookBookmark } from "react-icons/fa6";
import NavItems from "./navitems";
import AIChatButton from "@/components/AIChatButton";

const Navbar = () => {
  return (
    <nav className="w-full py-4 bg-white text-black">
      <div className="flex justify-center items-center gap-5 ">
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
