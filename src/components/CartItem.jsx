import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "../features/cartSlice";
const CartItem = ({ prod }) => {
  const { _id, name, price, quantity, cartQty } = prod;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const handleRemove = async (prod) => {
    dispatch(removeFromCart(prod));
  };
  const handleDecrease = async (prod) => {
    dispatch(decreaseCart(prod));
  };
  const handleIncrease = async (prod) => {
    dispatch(addToCart(prod));
  };

  return (
    <>
      <tr key={_id}>
        <td className="p-4">{name}</td>
        <td className="px-10">{price}</td>
        <td className="p-4">
          <div>
            <button onClick={() => handleDecrease(prod)}>-</button>
            {cartQty}
            <button onClick={() => handleIncrease(prod)}>+</button>
          </div>
        </td>
        <td className="px-10" id="total" onChange={(e) => setTotal(e.target)}>
          {cartQty * price}
        </td>
        <td className="px-10 cursor-pointer" onClick={() => handleRemove(prod)}>
          {<AiOutlineDelete size={25} />}
        </td>
      </tr>
    </>
  );
};

export default CartItem;
