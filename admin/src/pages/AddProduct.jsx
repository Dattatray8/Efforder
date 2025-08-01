import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";

function AddProduct() {
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    discount: "",
    image: null,
    category: "",
    productId: "",
    stock: "",
    description: "",
    features: [""],
  });

  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Laptops",
    "SmartPhones",
    "Audio",
    "Cameras",
    "Wearables",
    "Gaming",
    "Speakers",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in formData) {
      if (["oldPrice", "discount", "reviewCount"].includes(key)) continue;

      if (
        key === "features" &&
        (!formData.features ||
          formData.features.length === 0 ||
          formData.features[0] === "")
      ) {
        alert("Please fill in the product features.");
        return;
      }

      if (key === "image" && formData.image === null) {
        alert("Please upload a product image.");
        return;
      }

      if (!formData[key]) {
        alert(`Please fill in the Product ${key} field.`);
        return;
      }
    }

    console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        `${serverUrl}/api/products/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="pl-[15%] pt-20 pr-8 pb-8 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Add New Product
        </h1>

        <div onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Product Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              required
            />

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product ID *
              </label>
              <input
                type="text"
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter unique product ID"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Old Price (Optional)
              </label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter old price"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Review Count (Optional)
              </label>
              <input
                type="number"
                name="reviewCount"
                value={formData.reviewCount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter number of reviews"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Discount % (Optional)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter discount percentage"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter stock quantity"
                min="0"
                required
              />
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter product description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Features *
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  features: e.target.value,
                }))
              }
              rows="6"
              className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
              placeholder="Enter each feature on a new line&#10;Feature 1&#10;Feature 2&#10;Feature 3"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter each feature on a separate line
            </p>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  price: "",
                  oldPrice: "",
                  discount: "",
                  image: null,
                  category: "",
                  productId: "",
                  stock: "",
                  description: "",
                  features: [""],
                });
                setImagePreview(null);
              }}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
