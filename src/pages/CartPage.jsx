import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineDelete } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { clearCart, getTotal } from "../features/cartSlice";
import { getUserDetails } from "../helpers/SessionHelper";

const CartPage = () => {
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cartSlice);
  const deleteHandle = () => {
    dispatch(clearCart());
  };

  const orderHandle = async () => {
    if (auth === null) {
      navigate("/Login");
    }
    console.log(cart);
  };
  dispatch(getTotal());

  return (
    <div className="px-12 py-20 w-full">
      {cart?.cartItems.length !== 0 ? (
        <div className="container">
          <table className="table-auto  mx-auto">
            <thead className="border-b-2 ">
              <tr>
                <th className="p-4">Product</th>
                <th className=" px-10">Price</th>
                <th className="p-4">Qty.</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart?.cartItems.map((prod, i) => {
                return <CartItem key={i} prod={prod} />;
              })}
            </tbody>
          </table>
          <div className="w-full flex flex-col justify-end items-end border-t	">
            <h1 className="pt-5 pb-2 text-2xl">
              Total: {cart.cartTotalAmount}
            </h1>
            <span className="text-gray-500 text-sm">
              Additional fees and taxes may apply*
            </span>
            <div className="flex gap-4 mt-5">
              <button
                className="px-4 py-2 bg-red-900 text-white"
                onClick={() => deleteHandle()}
              >
                <span>
                  Delete Cart
                  <AiOutlineDelete size={24} />
                </span>
              </button>
              <button
                onClick={() => orderHandle()}
                className="px-4 py-2 bg-green-900 text-white"
              >
                CheckOut <BsBagCheck size={24} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mt-8 ">
            Your cart is empty.{" "}
            <Link
              className="flex gap-4 
          text-xl text-red-500"
              to="/products"
            >
              <AiOutlineArrowLeft size={25} /> Start shopping
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default CartPage;
