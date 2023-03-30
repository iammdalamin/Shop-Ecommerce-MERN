import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { useGetAllCategoriesQuery } from "../../features/categoryApi";
import {
  useGetAllProductsAdminQuery,
  useProductAddMutation,
} from "../../features/productsApi";

const ProductCreatePage = () => {
  const { refetch } = useGetAllProductsAdminQuery();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
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
      category,
      shipping: true,
      quantity,
    };
    try {
      await productAdd(data)
        .unwrap()
        .then(() => {
          refetch();
          cogoToast.success("Product Added Successfully");

          navigate("/admin/dashboard/products");
        });
    } catch (error) {
      cogoToast.error(error.data.message);
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

  const { data, error, isLoading } = useGetAllCategoriesQuery();
  if (result.status === "pending") {
    cogoToast.loading("Please wait...");
  }
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

            <select
              onClick={(e) => setCategory(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>
                Choose a category
              </option>

              {data?.map((item) => {
                return (
                  <>
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                    ;
                  </>
                );
              })}
            </select>
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
