import React from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
import Loading from "./Loading";
import ProductItem from "./ProductItem.jsx";
const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  return (
    <div className="px-12 py-20">
      <h1 className="text-4xl font-extrabold">Products</h1>
      <div className="container m-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 grid-flow-row gap-4 md:pt-6 pt-4 ">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <h1>Something went wrong!</h1>
        ) : (
          data.map((prod, i) => {
            return <ProductItem key={i} prod={prod} />;
          })
        )}
      </div>
    </div>
  );
};

export default Products;
