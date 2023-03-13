import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useProductAddQuery } from "../../features/productsApi";

const ProductCreatePage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("640b620dabd2316b635c150e");
  const [shipping, setShipping] = useState(true);
  const [item, setItem] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("photo", img);
    productData.append("name", title);
    productData.append("description", desc);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("shipping", shipping);
    productData.append("quantity", quantity);
    setItem(productData);
  };
  useProductAddQuery("item");
  const onChangeHandle = (e) => {
    if (e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };
  const { data, error, isLoading } = useProductAddQuery();
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-[550px] h-full bg-slate-600 mt-48 p-8">
        <h2 className="text-3xl text-white text-center font-bold ">
          Product Add
        </h2>
        <div className="flex flex-col gap-4 px-14 py-8">
          <form encType="multipart/form-data">
            <input
              type="text"
              placeholder="Title"
              className="p-2 rounded-md"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="p-2 rounded-md"
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="p-2 rounded-md"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="p-2 rounded-md"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input
              type="file"
              placeholder="Image"
              className="p-2 rounded-md"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </form>

          <button
            onClick={(e) => handleOnSubmit(e)}
            className="px-5 py-2 bg-gray-50 hover:bg-slate-800 hover:text-gray-50 duration-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCreatePage;
