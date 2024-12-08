import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden w-full h-[300px] flex items-center justify-center bg-gray-100">
        <img
          className="hover:scale-110 transition-transform ease-in-out w-full h-full object-cover"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">CAD ${price}</p>
    </Link>
  );
};

export default ProductItem;
