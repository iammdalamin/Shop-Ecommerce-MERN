import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useSingleProductQuery } from "../features/productsApi";

const ProductPage = () => {
  const { slug } = useParams();
  console.log(slug);
  const { data, error, isLoading } = useSingleProductQuery(slug);
  // const { _id, name, description, price, category, quantity, sold, shipping } =
  //   data?.data[0];
  console.log(data?.data[0]);
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
            <img
              className="w-1/2"
              src={`http://localhost:5000/api/v1/product/photo/${data?.data[0]._id}`}
              alt={data?.data[0].name}
            />
            <div className="p-10">
              <h1 className="text-3xl">{data?.data[0].name}</h1>
              <p className="text-lg leading-6">{data?.data[0].description}</p>
              <p>Available: {data?.data[0].quantity}</p>
              <span>Price: ${data?.data[0].price}</span>

              <div className="mt-8">
                <button className="px-4 py-2 rounded-lg bg-black text-gray-200">
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
