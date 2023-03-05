import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { getCart, setCart } from "../helpers/SessionHelper";

const CartItem = ({ prod }) => {
  const { _id, name, price } = prod;
  const [qty, setQty] = useState(1);
  const cartItems = getCart();
  const handleRemove = async (productId) => {
    const newCart = await cartItems.filter((prod) => productId !== prod._id);
    setCart(newCart);
    window.location.reload(false);
  };
  return (
    <>
      <tr key={_id}>
        <td className="p-4">{name}</td>
        <td className="px-10">{price}</td>
        <td className="p-4">
          {" "}
          <input
            className="border-2 p-2"
            defaultValue={"1"}
            min="1"
            type="number"
            id="quantity"
            name="quantity"
            onChange={(e) => setQty(e.target.value)}
          />
        </td>
        <td className="px-10">{qty * price}</td>
        <td className="px-10 cursor-pointer" onClick={() => handleRemove(_id)}>
          {<AiOutlineDelete size={25} />}
        </td>
      </tr>
    </>
  );
};

export default CartItem;
