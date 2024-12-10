import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Title from "../components/Title";
import defaultImage from "../assets/logo.png";
import bin from "../assets/bin.png";
const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shipping = 10; // Flat shipping fee

  // Fetch cart items from localStorage
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartData(storedCart);

        // Fetch product details from Firebase
        const productIds = storedCart.map((item) => item._id);
        if (productIds.length > 0) {
          const q = query(collection(db, "products"), where("__name__", "in", productIds));
          const querySnapshot = await getDocs(q);

          const fetchedProducts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const newSubtotal = cartData.reduce((acc, item) => {
        const product = products.find((p) => p.id === item._id);
        if (product) {
          return acc + product.price * item.quantity;
        }
        return acc;
      }, 0);
      setSubtotal(newSubtotal);
    };

    calculateTotals();
  }, [cartData, products]);

  const updateQuantity = (id, size, quantity) => {
    const updatedCart = cartData.map((item) =>
      item._id === id && item.size === size ? { ...item, quantity } : item
    );
    setCartData(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeItem = (id, size) => {
    const updatedCart = cartData.filter((item) => !(item._id === id && item.size === size));
    setCartData(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Update cart count in local storage
    const cartCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
    localStorage.setItem("cartCount", cartCount);
    
    // Dispatch custom event to update cart count in Navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (!cartData.length) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product.id === item._id);

          if (!productData) {
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700">
                <p>Product not found for ID: {item._id}</p>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0] || defaultImage} alt="Product" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>${productData.price.toFixed(2)}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => removeItem(item._id, item.size)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={bin}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="flex justify-between py-2 border-b">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between py-2 border-b">
            <p>Shipping:</p>
            <p>${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between py-2 border-t font-bold">
            <p>Total:</p>
            <p>${(subtotal + shipping).toFixed(2)}</p>
          </div>
          <div className="w-full text-end">
            <button
              onClick={() => console.log("Proceed to checkout")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;