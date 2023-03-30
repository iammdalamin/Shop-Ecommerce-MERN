import React, { useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from "react-icons/ai";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../helpers/SessionHelper";
const AdminLayout = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const { data } = getUserDetails();
  return (
    <div>
      {toggle ? (
        <nav className="w-80 h-screen fixed  p-12 mx-auto flex flex-col items-start justify-between bg-slate-800 text-white  z-[999999]  ease-in-out duration-700">
          <div className="w-full">
            <div className="nav-brand flex flex-row justify-between items-center w-full">
              <Link to="/admin/dashboard">Shop</Link>
              <i
                className="p-2 ml-2 bg-white text-slate-800 rounded-xl cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                <AiOutlineArrowLeft size={20} />
              </i>
            </div>
            <div className="nav-items w-full mt-10">
              <ul className="flex flex-col gap-4">
                <li className="bg-gray-700 p-2 rounded-xl">
                  <Link
                    to="/admin/dashboard"
                    className="w-full flex justify-between "
                  >
                    Home <AiOutlineHome size={20} />
                  </Link>
                </li>
                <li className="bg-gray-700 p-2 rounded-xl">
                  <Link
                    to="/admin/dashboard/product-add"
                    className="w-full flex justify-between "
                  >
                    Add Product <HiOutlineViewGridAdd size={20} />
                  </Link>
                </li>
                <li className="bg-gray-700 p-2 rounded-xl">
                  <Link
                    to="/admin/dashboard/products"
                    className="w-full flex justify-between "
                  >
                    Products <MdOutlineProductionQuantityLimits size={20} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-2 rounded-xl bg-gray-600 flex gap-2 items-center">
            <img
              src={`https://res.cloudinary.com/himu/image/upload/v1679813670/shop/9311412861606062171-512_avuw0o.png`}
              className="w-10 h-10 "
            />
            <h2>{data.name}</h2>
          </div>
        </nav>
      ) : (
        <nav className="w-20 h-screen fixed  px-5 py-12 mx-auto flex flex-col items-start justify-between bg-slate-800 text-white  z-[999999]  ease-in-out duration-700 ">
          <div className="w-full">
            <div className="nav-brand flex flex-row justify-between items-center w-full">
              <Link to="/admin/dashboard">Shop</Link>
              <i
                className="p-2 ml-2 bg-white text-slate-800 rounded-xl cursor-pointer shadow-xl"
                onClick={() => setToggle(!toggle)}
              >
                <AiOutlineArrowRight size={20} />
              </i>
            </div>
            <div className="nav-items w-full mt-10">
              <ul className="flex flex-col gap-4">
                <li className="active:bg-gray-500 bg-gray-700 p-2 rounded-xl flex justify-center items-center">
                  <Link to="/admin/dashboard">
                    <AiOutlineHome size={20} />
                  </Link>
                </li>
                <li className="active:bg-gray-500 bg-gray-700 p-2 rounded-xl flex justify-center items-center">
                  <Link to="/admin/dashboard/product-add">
                    <HiOutlineViewGridAdd size={20} />
                  </Link>
                </li>
                <li className=" active:bg-gray-500 bg-gray-700 p-2 rounded-xl flex justify-center items-center">
                  <Link to="/admin/dashboard/products">
                    <MdOutlineProductionQuantityLimits size={20} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-2 rounded-xl bg-gray-600 flex gap-2 items-center">
            <img
              src={`https://res.cloudinary.com/himu/image/upload/v1679813670/shop/9311412861606062171-512_avuw0o.png`}
              className="w-8 h-8 "
            />
          </div>
        </nav>
      )}

      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
