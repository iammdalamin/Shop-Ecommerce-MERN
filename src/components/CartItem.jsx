import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { getCart, setCart } from "../helpers/SessionHelper";

const CartItem = ({ prod }) => {
  const { _id, name, price, quantity } = prod;
  const [qty, setQty] = useState(1);
  const [options, SetOption] = useState([]);

  const cartItems = getCart();
  const handleRemove = async (productId) => {
    const newCart = await cartItems.filter((prod) => productId !== prod._id);
    if (newCart.length < 1) {
      setCart(null);
    }
    setCart(newCart);
    window.location.reload(true);
  };
  useEffect(() => {
    for (let i = 0; i < quantity; i++) {
      options.push(i);
    }
  }, []);
  return (
    <>
      <tr key={_id}>
        <td className="p-4">{name}</td>
        <td className="px-10">{price}</td>
        <td className="p-4">
          <select name="quantity" id="quantity">
            {options.map((option, i) => {
              return (
                <option key={i} value={option++}>
                  {option++}
                </option>
              );
            })}
          </select>{" "}
          <input
            className="border-2 p-2"
            defaultValue={"1"}
            min="1"
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
        <td className="px-10 cursor-pointer" onClick={() => handleRemove(_id)}>
          {<AiOutlineDelete size={25} />}
        </td>
      </tr>
    </>
  );
};

export default CartItem;
