import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return <p className="p-4">You have no favorite products.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h2 className="mt-2 font-medium">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => removeFromFavorites(product.id)}
              className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
