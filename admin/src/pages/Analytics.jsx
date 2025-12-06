import React, { useState, useContext } from "react";
import { PieChart, BarChart3 } from "lucide-react";
import { ProductDataContext } from "../context/ProductContext";
import Visualisation from "../components/Visualisation";

function Analytics() {
  const [activeTab, setActiveTab] = useState("products");
  const [showChart, setShowChart] = useState(false);

  const { products, orders } = useContext(ProductDataContext);

  // -------- PRODUCT CHART DATA --------
  const categoryCount = products.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const productLabels = Object.keys(categoryCount);
  const productValues = Object.values(categoryCount);

  // -------- ORDER STATUS CHART DATA --------
  const statusCount = orders.reduce((acc, order) => {
    const status = order.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  const orderLabels = Object.keys(statusCount);
  const orderValues = Object.values(statusCount);

  return (
    <div className="mt-20 p-6 min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics</h1>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "products"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("products");
              setShowChart(false);
            }}
          >
            Products
          </button>

          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "orders"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("orders");
              setShowChart(false);
            }}
          >
            Order Status
          </button>
        </div>

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <PieChart className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Products Analysis
              </h2>
            </div>

            <button
              onClick={() => setShowChart(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Show Product Insights
            </button>

            {showChart && (
              <div className="mt-6">
                <Visualisation
                  title="Product Category Distribution"
                  labels={productLabels}
                  values={productValues}
                />
              </div>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Order Status Analysis
              </h2>
            </div>

            <button
              onClick={() => setShowChart(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
            >
              Show Order Status Insights
            </button>

            {showChart && (
              <div className="mt-6">
                <Visualisation
                  title="Order Status Distribution"
                  labels={orderLabels}
                  values={orderValues}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
