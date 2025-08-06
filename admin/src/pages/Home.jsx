import {
  CircleCheckBig,
  CirclePlus,
  List,
  TrendingUp,
  Package,
  ShoppingCart,
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import { ProductDataContext } from "../context/ProductContext";
import { useEffect } from "react";

function Home() {
  const navigation = useNavigate();
  const { adminData } = useContext(userDataContext);
  const { products, fetchProducts } = useContext(ProductDataContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const analyticsData = {
    totalItems: products.length,
    totalOrders: 0,
    pendingOrders: 0,
  };

  return (
    adminData && (
      <div className="min-h-screen bg-blue-50 p-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's an overview of your e-commerce store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.totalItems}
                  </p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.totalOrders}
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.pendingOrders}
                  </p>
                </div>
                <CircleCheckBig className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            {/* <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{analyticsData.revenue}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </div> */}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border hover:border-blue-500"
                onClick={() => navigation("/add")}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CirclePlus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Add Items</h3>
                    <p className="text-sm text-gray-600">
                      Add new products to your inventory
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border hover:border-green-500"
                onClick={() => navigation("/lists")}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <List className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">List Items</h3>
                    <p className="text-sm text-gray-600">
                      View and manage your product catalog
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border hover:border-purple-500"
                onClick={() => navigation("/orders")}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <CircleCheckBig className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">View Orders</h3>
                    <p className="text-sm text-gray-600">
                      Monitor and manage customer orders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="text-center py-8 text-gray-500">
              <p>
                Recent activity will appear here once you start adding items and
                receiving orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Home;
