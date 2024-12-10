import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import { db } from '../../firebase'; // Import your Firestore configuration
import { collection, getDocs } from 'firebase/firestore';
import { assets } from "../assets/assets";

const Collection = () => {
  const { search, showSearch } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [sortType, setSortType] = useState(''); // Sort order
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Reference to the products collection
        const productSnapshot = await getDocs(productsCollection); // Fetch all documents
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map to get data

        setProducts(productList);
        setFilterProducts(productList);

        // Extract unique categories and subcategories
        const uniqueCategories = [...new Set(productList.map(item => item.category))];
        const uniqueSubCategories = [...new Set(productList.map(item => item.subCategory))];

        setCategories(uniqueCategories);
        setSubCategories(uniqueSubCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts(); // Call the fetch function
  }, []);

  const applyFilter = () => {
    let filteredProducts = products.slice();

    // Filter by selected categories
    if (selectedCategory.length > 0) {
      filteredProducts = filteredProducts.filter(item => selectedCategory.includes(item.category));
    }

    // Filter by selected subCategory
    if (selectedSubCategory.length > 0) {
      filteredProducts = filteredProducts.filter(item => selectedSubCategory.includes(item.subCategory));
    }

    // Filter by search
    if (search) {
      filteredProducts = filteredProducts.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products
    if (sortType === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [selectedCategory, selectedSubCategory, search, sortType]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
        </p>

        {/* Category Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((category) => (
              <p key={category} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={category}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCategory(prev => 
                      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
                    );
                  }}
                />{" "}
                {category}
              </p>
            ))}
          </div>
        </div>

        {/* Sub Category Filter */}
        <div className="border border-gray-300 pl-5 py-3 my-5">
          <p className="mb-3 text-sm font-medium">SUB CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {subCategories.map((subCategory) => (
              <p key={subCategory} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={subCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedSubCategory(prev => 
                      prev.includes(value) ? prev.filter(sc => sc !== value) : [...prev, value]
                    );
                  }}
                />{" "}
                {subCategory}
              </p>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="border border-gray-300 pl-5 py-3 my-5">
          <p className="mb-3 text-sm font-medium">SORT BY PRICE</p>
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="">Select</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
