import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { addToCart } from "../features/cartSlice";
import { useSingleProductQuery } from "../features/productsApi";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { data, error, isLoading } = useSingleProductQuery(slug);
  const prod = data?.data[0];
  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod));
  };
  console.log(prod);
  return (
    <div className="px-12 py-20 w-full h-screen container mx-auto flex justify-center items-center ">
      <div className="flex justify-start items-start bg-gray-200 rounded-lg">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <h1>Somethingwentwrong!</h1>
        ) : (
          <>
            {" "}
            <img className="w-1/2" src={prod.photo} alt={prod.name} />
            <div className="p-10">
              <h1 className="text-3xl">{prod.name}</h1>
              <p className="text-lg leading-6">{prod.description}</p>
              <p>Available: {prod.quantity}</p>
              <span>Price: ${prod.price}</span>

              <div className="mt-8">
                <button
                  onClick={() => handleAddToCart(prod)}
                  className="px-4 py-2 rounded-lg bg-black text-gray-200"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
