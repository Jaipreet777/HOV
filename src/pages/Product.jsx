import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase"; // Import your Firestore configuration
import { doc, getDoc } from "firebase/firestore";
import defaultImage from "../assets/logo.png"; // Import your default image
 
const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [size, setSize] = useState(""); // Manage selected size
  const [mainImage, setMainImage] = useState(defaultImage); // Initialize with default image
  const [activeTab, setActiveTab] = useState("reviews"); // Tab management
  const [showProductDetails, setShowProductDetails] = useState(false); // Toggle product details
  const [showSizeGuide, setShowSizeGuide] = useState(false); // Toggle size guide
  const [isFavorited, setIsFavorited] = useState(false); // Track wishlist state
 
  const reviews = [
    { id: 1, name: "Neet", comment: "Excellent quality and design!", rating: 5 },
    { id: 2, name: "Deep", comment: "Loved the product, delivery was fast too.", rating: 4 },
    { id: 3, name: "Preet", comment: "Satisfied with the purchase, good customer support.", rating: 5 },
    { id: 4, name: "Noor", comment: "Product is decent but packaging could be better.", rating: 3 },
  ];
 
  // Fetch product data from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id); // Reference to the product document
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          const data = productSnapshot.data();
          setProductData(data);
          setMainImage(data.image && data.image.length > 0 ? data.image[0] : defaultImage);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProduct();
  }, [id]);
 
  // Add to Cart Functionality
  const addToCart = () => {
    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }
 
    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCartItem = {
      _id: id,
      name: productData.name,
      price: productData.price,
      size,
      image: productData.image,
      quantity: 1,
    };
 
    const existingItemIndex = currentCart.findIndex(
      (item) => item._id === id && item.size === size
    );
 
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push(newCartItem);
    }
 
    localStorage.setItem("cartItems", JSON.stringify(currentCart));
   
    // Update cart count in local storage
    const cartCount = currentCart.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem("cartCount", cartCount);
   
    // Dispatch custom event to update cart count in Navbar
    window.dispatchEvent(new Event('cartUpdated'));
 
    alert("Product added to cart!");
  };
 
  // Toggle Favorites (Wishlist) State
  const toggleFavorites = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      alert("Product added to favorites!");
    } else {
      alert("Product removed from favorites!");
    }
    // Implement your logic for adding/removing favorites here
  };
 
  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }
 
  // No product found
  if (!productData) {
    return <div>No product found.</div>;
  }
 
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* -------- Product Images ---------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image && productData.image.map((item, index) => (
              <img
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                src={item}
                alt={productData.name}
                onClick={() => setMainImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-lg border border-gray-200"
              src={mainImage}
              alt={productData.name}
            />
          </div>
        </div>
 
        {/* -------- Product Info ---------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
 
          {/* Brief Description under product name */}
          {productData.Description && (
            <p className="mt-4 text-gray-700 text-sm">{productData.Description}</p>
          )}
 
          <p className="mt-5 text-3xl font-medium">${productData.price}</p>
 
          {/* Size Selection + Size Guide */}
          <div className="flex flex-col gap-4 my-8">
            <div className="flex items-center gap-20">
              <p className="font-medium">Select Size</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-sm text-black hover:text-gray-700"
              >
                Size Guide
              </button>
            </div>
            {showSizeGuide && (
              <div className="bg-gray-100 p-4 rounded shadow text-sm text-gray-800">
                <h4 className="font-semibold mb-2">Size Chart</h4>
                {/* Replace the below table with your actual size chart */}
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b pb-2">Size</th>
                      <th className="border-b pb-2">Chest (in)</th>
                      <th className="border-b pb-2">Waist (in)</th>
                      <th className="border-b pb-2">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 border-b">S</td>
                      <td className="py-2 border-b">34-36</td>
                      <td className="py-2 border-b">28-30</td>
                      <td className="py-2 border-b">27</td>
                    </tr>
                    <tr>
                      <td className="py-2 border-b">M</td>
                      <td className="py-2 border-b">38-40</td>
                      <td className="py-2 border-b">32-34</td>
                      <td className="py-2 border-b">28</td>
                    </tr>
                    <tr>
                      <td className="py-2 border-b">L</td>
                      <td className="py-2 border-b">42-44</td>
                      <td className="py-2 border-b">36-38</td>
                      <td className="py-2 border-b">29</td>
                    </tr>
                    <tr>
                      <td className="py-2">XL</td>
                      <td className="py-2">46-48</td>
                      <td className="py-2">40-42</td>
                      <td className="py-2">30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
 
            <div className="flex gap-2">
              {productData.sizes &&
                productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
 
          {/* Buttons: Add to Cart and Add to Wishlist (with heart icon) in vertical arrangement */}
          <div className="mt-4">
            <button
              onClick={addToCart}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 w-full"
            >
              ADD TO CART
            </button>
            <button
    onClick={toggleFavorites}
    className="bg-gray-300 text-black px-8 py-3 text-sm hover:bg-gray-400 border-none flex items-center justify-center gap-2 mt-4 w-full"
    title="Add to Favorites"
  >
    ADD TO WISHLIST&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isFavorited ? "♥" : "♡"}
  </button>
          </div>
 
          {/* Product Details Toggle Button */}
          {productData.details && (
            <div className="mt-4">
              <button
                onClick={() => setShowProductDetails(!showProductDetails)}
                className="text-base text-black hover:text-gray-700 flex items-center gap-20"
              >
                Product Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {showProductDetails ? (
                  <span className="transform">▲</span>
                ) : (
                  <span className="transform">▼</span>
                )}
              </button>
              {showProductDetails && (
                <div className="mt-4 text-gray-700 text-sm">
                  {/* If details is a string */}
                  {typeof productData.details === "string" && (
                    <p>{productData.details}</p>
                  )}
                  {/* If details is an array of strings */}
                  {Array.isArray(productData.details) && productData.details.map((detail, index) => (
                    <p key={index}>• {detail}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
 
      {/* -------- Tabs Section ---------- */}
      <div className="mt-20">
        <div className="flex border-b">
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "reviews" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>
 
        {/* -------- Tab Content ---------- */}
        <div className="px-6 py-6 text-sm text-gray-500">
          {activeTab === "reviews" && (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <p className="font-medium">{review.name}</p>
                  <p>{review.comment}</p>
                  <p className="text-yellow-500">
                    {"⭐".repeat(review.rating)}{" "}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

// ChatGPT - Can you review the Firestore fetching logic and suggest improvements
// ChatGPT - How can I handle missing product data fields like image, sizes, or details
// ChatGPT - Is my "Add to Cart" logic GOOD enough to handle duplicate items and size selection errors
// ChatGPT - Give me some UX improvements can I make to the image gallery, size selection, or button
// https://www.w3schools.com