import React from "react";
import Hero from "../components/Hero";
import Products from "../components/Products";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Products itemsPerPage={4} />
    </>
  );
};

export default HomePage;
