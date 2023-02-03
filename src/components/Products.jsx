import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductListRequest } from "../ApiRequest/api";
import ProductItem from "./ProductItem.jsx";
const Products = () => {
  const products = useSelector((state) => state.Products);
  useEffect(() => {
    ProductListRequest();
  }, []);
  return (
    <div className="px-12 py-20">
      <h1 className="text-4xl font-extrabold">Products</h1>
      <div className="container m-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 grid-flow-row gap-4 md:pt-6 pt-4 ">
        {products.map((prod, i) => {
          return <ProductItem key={i} prod={prod} />;
        })}
      </div>
    </div>
  );
};

export default Products;
