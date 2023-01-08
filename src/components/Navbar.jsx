import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleHandle = () => {
    setToggle(!toggle);
  };
  console.log(toggle);
  return (
    <>
      <nav className="w-full h-[80px] px-12 mx-auto flex items-center justify-between bg-[#dddadac0]  ">
        <div className="nav-title">
          <a className="font-bold text-2xl" href="/">
            Shop
          </a>
        </div>
        <div className="nav-links lg:flex">
          <ui className=" list-none hidden lg:flex justify-between gap-6  ">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Products</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Contacts</a>
            </li>
          </ui>
        </div>
        <div className="nav-icons flex gap-4">
          <i className="text-2xl">
            <AiOutlineShoppingCart />
          </i>

          <i className="text-2xl">
            <CgProfile />
          </i>
          <i
            className="text-2xl lg:hidden md:inline-block"
            onClick={() => toggleHandle()}
          >
            {toggle ? (
              <RxCross1 className="ease-in-out duration-500" />
            ) : (
              <RxHamburgerMenu className="ease-in-out duration-500" />
            )}
          </i>
        </div>
      </nav>
      {/* For Mobile Version */}
      <div
        className={
          toggle
            ? "lg:hidden flex justify-center items-center fixed right-0 top-20 w-[75%] sm:w-[100%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in-out duration-500 z-10"
            : "flex justify-center items-center fixed right-[-100%] h-screen w-full  top-20 p-10 z-10 ease-in-out duration-500"
        }
      >
        <ui className=" list-none flex flex-col gap-6 lg:hidden ">
          <li>
            <a className="text-2xl" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="text-2xl" href="/">
              Products
            </a>
          </li>
          <li>
            <a className="text-2xl" href="/">
              About
            </a>
          </li>
          <li>
            <a className="text-2xl" href="/">
              Contacts
            </a>
          </li>
        </ui>
      </div>
    </>
  );
};

export default Navbar;
