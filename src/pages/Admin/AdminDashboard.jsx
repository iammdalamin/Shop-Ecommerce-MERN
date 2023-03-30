import React from "react";
import Chart from "react-apexcharts";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminDashboard = () => {
  const data = {
    series: [44, 55, 13, 33],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Product A", "Product B", "Product C", "Product D"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <Chart
          options={data.options}
          series={data.series}
          type="pie"
          width={380}
        />
      </div>{" "}
    </AdminLayout>
  );
};

export default AdminDashboard;
