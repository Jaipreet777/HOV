import React, { useContext, useEffect } from 'react';
import { WishlistContext } from '../context/WishlistContext';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    console.log('Wishlist items:', wishlist); // Debug wishlist content
  }, [wishlist]);

  if (wishlist.length === 0) {
    return <p className="p-4">Your wishlist is empty!</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h2 className="mt-2 font-medium">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
