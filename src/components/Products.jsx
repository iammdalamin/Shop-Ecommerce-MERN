import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { fetchAPI } from "../Helper/APIRequest";
import ProductItem from "./ProductItem";
const Products = async ({ itemsPerPage }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  // return (
  //   <>
  //     <Items currentItems={currentItems} />
  //     <ReactPaginate
  //       breakLabel="..."
  //       nextLabel="next >"
  //       onPageChange={handlePageClick}
  //       pageRangeDisplayed={5}
  //       pageCount={pageCount}
  //       previousLabel="< previous"
  //       renderOnZeroPageCount={null}
  //     />
  //   </>
  // );

  useEffect(async () => {
    const fetch = await fetchAPI();
  }, []);
  const ProductItemsss = await useSelector((state) => state.Products[0]);
  const ProductItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  console.log(ProductItemsss);
  const currentItems = ProductItems.slice(itemOffset, endOffset);
  console.log(currentItems);

  const pageCount = Math.ceil(ProductItems.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % ProductItems.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="container m-auto grid grid-cols-4 grid-flow-row gap-4 ">
      <>
        <ProductItem prods={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    </div>
  );
};

export default Products;
