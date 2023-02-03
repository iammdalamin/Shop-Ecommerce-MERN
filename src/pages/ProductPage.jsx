import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { singleProduct } from "../ApiRequest/api";

const ProductPage = () => {
  const { productId } = useParams();

  const product = singleProduct(productId);
  product
    .then((res) => {
      if (res) {
        console.log(res);

        return res;
      } else {
        console.log("Error");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(product);

  return <div>ProductPage</div>;
};

export default ProductPage;
