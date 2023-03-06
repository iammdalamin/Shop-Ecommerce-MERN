import React from "react";
import { useParams } from "react-router";

const ProductPage = async () => {
  const { slug } = useParams();
  console.log(slug);

  return (
    <div className="px-12 py-20 w-full">
      <h1>Hello</h1>
    </div>
  );
};

export default ProductPage;
