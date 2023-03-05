import React, { useState } from "react";
import CartItem from "../components/CartItem";
import { getCart, removeCart } from "../helpers/SessionHelper";

const CartPage = () => {
  const cartItems = getCart();
  const deleteHandle = () => {
    removeCart();
  };
  return (
    <div className="px-12 py-20 w-full">
      {cartItems ? (
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
              {cartItems.map((prod, i) => {
                return <CartItem key={i} prod={prod} />;
              })}
            </tbody>
          </table>
          <div className="w-full flex justify-end ">
            <button
              className="px-4 py-2 bg-red-900 text-white"
              onClick={() => deleteHandle()}
            >
              Delete Cart
            </button>
            <button className="px-4 py-2 bg-green-900 text-white">
              CheckOut
            </button>
          </div>
        </div>
      ) : (
        <h1>
          Your cart is empty. <a href="/products">Add to cart</a>
        </h1>
      )}
    </div>
  );
};

export default CartPage;
