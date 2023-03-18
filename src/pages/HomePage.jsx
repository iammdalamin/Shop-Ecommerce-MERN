import React from "react";
import Hero from "../components/Hero";
import MasterLayout from "../components/MasterLayout";
import Products from "../components/Products";

const HomePage = () => {
  return (
    <>
      <MasterLayout>
        <Hero />
        <Products />
      </MasterLayout>
    </>
  );
};

export default HomePage;
