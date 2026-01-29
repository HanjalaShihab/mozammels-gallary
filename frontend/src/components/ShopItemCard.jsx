import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ChevronDown } from 'lucide-react';

const ShopItemCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showPrints, setShowPrints] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {item.original && (
            <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
              Original
            </span>
          )}
          {!item.available && (
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all"
        >
          <Heart
            size={20}
            className={isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Title */}
        <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
          {item.category}
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary-600">
            ${item.price}
          </span>
          {item.original && (
            <p className="text-xs text-gray-500 mt-1">Original artwork</p>
          )}
        </div>

        {/* Prints Dropdown */}
        {item.prints && item.prints.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowPrints(!showPrints)}
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium">Available Prints</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${showPrints ? 'rotate-180' : ''}`}
              />
            </button>
            
            {showPrints && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 space-y-2"
              >
                {item.prints.map((print, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{print.size}"</span>
                    <span className="font-semibold text-gray-900">${print.price}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          disabled={!item.available}
          className={`w-full px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
            item.available
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={20} />
          {item.available ? 'Add to Cart' : 'Sold Out'}
        </button>
      </div>
    </motion.div>
  );
};

export default ShopItemCard;
