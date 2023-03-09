import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
const CartItem = ({ prod }) => {
  const { _id, name, price, quantity, cartQty } = prod;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const handleRemove = async (prod) => {
    dispatch(removeFromCart(prod));
  };

  return (
    <>
      <tr key={_id}>
        <td className="p-4">{name}</td>
        <td className="px-10">{price}</td>
        <td className="p-4">
          <input
            className="border-2 p-2"
            defaultValue={cartQty}
            max={quantity}
            type="number"
            id="quantity"
            name="quantity"
            onChange={(e) => setQty(e.target.value)}
          />
        </td>
        <td className="px-10" id="total" onChange={(e) => setTotal(e.target)}>
          {qty * price}
        </td>
        <td className="px-10 cursor-pointer" onClick={() => handleRemove(prod)}>
          {<AiOutlineDelete size={25} />}
        </td>
      </tr>
      Total: {}
    </>
  );
};

export default CartItem;
