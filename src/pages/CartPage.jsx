import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { getTotal } from "../features/cartSlice";
import { getCart, removeCart } from "../helpers/SessionHelper";

const CartPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartSlice);
  const deleteHandle = () => {
    removeCart();
    window.location.reload(true);
  };

  const orderHandle = async () => {
    const cart = await getCart();
    console.log(cart);
  };
  dispatch(getTotal());
  console.log(cart);
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
          <div className="w-full flex justify-end ">
            <h1>Total: {cart.cartTotalAmount}</h1>
            <button
              className="px-4 py-2 bg-red-900 text-white"
              onClick={() => deleteHandle()}
            >
              Delete Cart
            </button>
            <button
              onClick={() => orderHandle()}
              className="px-4 py-2 bg-green-900 text-white"
            >
              CheckOut
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mt-8">
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
