import React from "react";
import { Link } from "react-router-dom";
import AdminProduct from "../../components/admin/AdminProduct";
import Loading from "../../components/Loading";
import {
  useDeleteProductMutation,
  useGetAllProductsAdminQuery,
} from "../../features/productsApi";

const AdminProductPage = () => {
  const [deleteProduct, result] = useDeleteProductMutation();
  const { refetch, data, isLoading, error } = useGetAllProductsAdminQuery();

  console.log(data);
  const deleteHandle = async (e, id) => {
    e.preventDefault();

    await deleteProduct(id);
    refetch();
  };
  console.log(result);
  return (
    <div className="px-12 py-20">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">Your Products</h1>
        <Link
          to="/admin/dashboard/product-add"
          className="px-5 py-2  bg-slate-800 text-gray-50 hover:bg-gray-50 hover:text-slate-800 duration-700"
        >
          Add Product
        </Link>
      </div>

      <div
        className="container m-auto grid lg:grid-cols
      -4 md:grid-cols-3 grid-cols-1 grid-flow-row gap-4 md:pt-6 pt-4 "
      >
        {isLoading ? (
          <Loading />
        ) : error ? (
          <h1>Something went wrong!</h1>
        ) : (
          data?.map((prod, i) => {
            return (
              <AdminProduct key={i} prod={prod} deleteHandle={deleteHandle} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminProductPage;
