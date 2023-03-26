import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { useProductAddMutation } from "../../features/productsApi";

const ProductCreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("640b620dabd2316b635c150e");
  const [shipping, setShipping] = useState(true);
  const [item, setItem] = useState();
  const [productAdd, result] = useProductAddMutation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      photo: img,
      name: title,
      description: desc,
      price,
      category: "640b620dabd2316b635c150e",
      shipping: true,
      quantity,
    };
    try {
      const payload = await productAdd(data).unwrap();
      console.log("fulfilled", payload);
      if (payload) {
        navigate("/admin/dashboard/products");
      }
    } catch (error) {
      console.error("rejected", error);
    }
  };
  const onChangeHandle = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };
  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImg(reader.result);
      };
    }
  };

  return (
    <AdminLayout>
      <div className="w-full h-full flex justify-center items-center ">
        <div className="w-[550px] h-full bg-slate-600 mt-48 p-8">
          <h2 className="text-3xl text-white text-center font-bold ">
            Product Add
          </h2>
          <div className="flex flex-col gap-4 px-14 py-8">
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
              onChange={(e) => onChangeHandle(e)}
            />

            <button
              onClick={(e) => handleOnSubmit(e)}
              className="px-5 py-2 bg-gray-50 hover:bg-slate-800 hover:text-gray-50 duration-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductCreatePage;
