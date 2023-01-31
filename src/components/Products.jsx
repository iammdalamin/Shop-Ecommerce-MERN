import React from "react";
import { ProductRequest } from "../ApiRequest/api";
const Products = async () => {
  const prod = await ProductRequest();
  console.log(prod);
  return (
    <div className="container m-auto grid grid-cols-4 grid-flow-row gap-4 ">
      <>{/* <ProductItem /> */}</>
      <h1>Products</h1>
    </div>
  );
};

export default Products;
