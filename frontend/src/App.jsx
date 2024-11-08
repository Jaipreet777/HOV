import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "../pages/Product";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vm] md:px-[7vm] 1g:px-[9vm]">
      <Navbar />
      <Routes>
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </div>
  );
};

export default App;

//REf: https://chatgpt.com/
// How we reslove the issue when the route is not importing correctly
//Ref: www.youtube.com for learning how routes work and react toastify
