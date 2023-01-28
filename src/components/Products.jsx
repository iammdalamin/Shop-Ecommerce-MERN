import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAPI } from "../ApiRequest/api";
import ProductItem from "./ProductItem";
const Products = async () => {
  const products = useSelector((state) => state.Products);

  useEffect(() => {
    const fetch = fetchAPI();
    console.log(fetch);
  }, []);
  console.log(products);
  return (
    <div className="container m-auto grid grid-cols-4 grid-flow-row gap-4 ">
      <>
        <ProductItem />
      </>
    </div>
  );
};

export default Products;
