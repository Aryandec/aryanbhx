import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" py-6 px-4 sm:px-8 lg:px-16 bg-white text-black">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-black">
        <p>© {new Date().getFullYear()} Aryanbhx. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href="https://github.com/Aryandec"><FaGithub className="h-5 w-5 hover:text-gray-900 dark:hover:text-black" /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;