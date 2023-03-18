import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, removeSessions } from "../helpers/SessionHelper";
const MasterLayout = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const cart = useSelector((state) => state.cartSlice);
  const toggleHandle = () => {
    setToggle(!toggle);
  };

  const logoutHandle = (e) => {
    e.preventDefault();
    removeSessions();
    setUser(null);
  };
  const UserDetails = async () => {
    const user = await getUserDetails();
    if (user) {
      setUser(user.data);
    } else {
      setUser(null);
    }
  };
  useEffect(() => {
    UserDetails();
    // UserProfile();
  }, []);

  return (
    <>
      <nav className="w-full h-[80px] fixed  px-12 mx-auto flex items-center justify-between bg-[#dddadac0]  z-[999999]  ">
        <div className="nav-title">
          <Link className="font-bold text-2xl" to="/">
            Shop
          </Link>
        </div>
        <div className="nav-links lg:flex">
          <div className=" list-none hidden lg:flex justify-between gap-6  ">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ProductsPage">Products</Link>
            </li>
            <li>
              <Link to="/AboutPage">About</Link>
            </li>
            <li>
              <Link to="/ContactPage">Contacts</Link>
            </li>
          </div>
        </div>
        <div className="nav-icons flex gap-4 relative">
          <Link to="/cart">
            <div className=" rounded-full text-sm  absolute bottom-4 left-2">
              <span>{cart?.cartItems.length}</span>
            </div>

            <i className="text-2xl">
              <AiOutlineShoppingCart />
            </i>
          </Link>

          <i className="text-2xl cursor-pointer group duration-700 ease-in-out">
            <CgProfile />
            <div className="w-52 h-52 p-4 absolute top-6 right-0  bg-gray-50 rounded-md duration-700 ease-in-out hidden  group-hover:block">
              {user ? (
                <>
                  {" "}
                  <h4 className="text-xl">{user.name}</h4>
                  <p className="text-lg">{user.email}</p>
                  <button
                    className="mt-10 px-5 py-2 text-lg font-bold bg-gray-900 text-slate-200"
                    onClick={(e) => logoutHandle(e)}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <h1>Please Login First!</h1>
                  <button
                    className="mt-10 px-5 py-2 text-lg font-bold bg-gray-900 text-slate-200"
                    onClick={(e) => logoutHandle(e)}
                  >
                    <Link to="/signup">SignUp</Link>
                  </button>
                </>
              )}
            </div>
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
            : "lg:hidden flex justify-center items-center fixed right-[-100%] h-screen w-full  top-20 p-10 z-10 ease-in-out duration-500"
        }
      >
        <div className=" list-none flex flex-col gap-6 lg:hidden ">
          <li>
            <Link className="text-2xl" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-2xl" to="/ProductsPage">
              Products
            </Link>
          </li>
          <li>
            <Link className="text-2xl" to="/AboutPage">
              About
            </Link>
          </li>
          <li>
            <Link className="text-2xl" to="/ContactPage">
              Contacts
            </Link>
          </li>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

export default MasterLayout;
