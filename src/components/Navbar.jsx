import { useState } from "react";
import { IoMdSettings, IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiSolidHomeSmile } from "react-icons/bi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-3 mt-1 px-4shadow-md">
      <h1 className="text-2xl font-bold">Apple</h1>


      <ul className="hidden md:flex space-x-3 py-1 font-light bg-white rounded-full shadow-md px-1.5 text-black">
        <li className="cursor-pointer hover:bg-[#8AE21E] hover:text-white px-3 py-1 rounded-full flex items-center gap-1">
          <BiSolidHomeSmile /> Dashboard
        </li>
        <li className="cursor-pointer hover:bg-[#8AE21E] hover:text-white px-3 py-1 rounded-full">
          Products
        </li>
        <li className="cursor-pointer hover:bg-[#8AE21E] hover:text-white px-3 py-1 rounded-full">
          Orders
        </li>
        <li className="cursor-pointer hover:bg-[#8AE21E] hover:text-white px-3 py-1 rounded-full">
          Sponsors
        </li>
        <li className="cursor-pointer hover:bg-[#8AE21E] hover:text-white px-3 py-1 rounded-full">
          Inventory
        </li>
      </ul>

      {/* Desktop Icons */}
      <div className="hidden md:flex space-x-3 items-center">
        <span className="text-gray-800 hover:text-black bg-white p-1.5 rounded-full">
          <IoMdSettings />
        </span>
        <span className="text-gray-800 hover:text-black bg-white p-1.5 rounded-full">
          <IoMdNotifications />
        </span>
        <span className="text-gray-800 hover:text-black bg-white p-1.5 rounded-full">
          <CgProfile />
        </span>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg flex flex-col items-center md:hidden">
          <ul className="flex flex-col w-full text-center">
            <li className="py-2 border-b hover:bg-gray-100 cursor-pointer">
              Dashboard
            </li>
            <li className="py-2 border-b hover:bg-gray-100 cursor-pointer">
              Products
            </li>
            <li className="py-2 border-b hover:bg-gray-100 cursor-pointer">
              Orders
            </li>
            <li className="py-2 border-b hover:bg-gray-100 cursor-pointer">
              Users
            </li>
            <li className="py-2 border-b hover:bg-gray-100 cursor-pointer">
              Inventory
            </li>
          </ul>
          <div className="flex justify-center space-x-5 py-3">
            <IoMdSettings className="text-2xl" />
            <IoMdNotifications className="text-2xl" />
            <CgProfile className="text-2xl" />
          </div>
        </div>
      )}
    </nav>
  );
};
