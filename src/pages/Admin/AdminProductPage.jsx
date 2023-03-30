import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminProduct from "../../components/admin/AdminProduct";
import Loading from "../../components/Loading";
import {
  useDeleteProductMutation,
  useGetAllProductsAdminQuery,
} from "../../features/productsApi";

const AdminProductPage = () => {
  const [deleteProduct, result] = useDeleteProductMutation();
  const { refetch, data, isLoading, error } = useGetAllProductsAdminQuery();

  const deleteHandle = async (e, id) => {
    e.preventDefault();

    await deleteProduct(id);
    refetch();
  };
  return (
    <AdminLayout>
      <div className="px-12 py-20">
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
    </AdminLayout>
  );
};

export default AdminProductPage;
