import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Filter, Tag, Truck, Shield } from 'lucide-react';
import ShopItemCard from '../components/ShopItemCard';

// Mock data - replace with API calls
const shopItems = [
  {
    id: 1,
    title: "Sunset Dreams",
    description: "Acrylic painting capturing the beauty of coastal sunsets",
    price: 450,
    original: true,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800",
    category: "painting",
    available: true,
    prints: [
      { size: "12x16", price: 45 },
      { size: "18x24", price: 75 },
      { size: "24x36", price: 120 }
    ]
  },
  // Add more items...
];

const Shop = () => {
  const [items, setItems] = useState(shopItems);
  const [sortBy, setSortBy] = useState('newest');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6"
        >
          <ShoppingBag size={32} className="text-primary-600" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
          Art Shop
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Own a piece of the journey. Original artworks and limited edition prints available for purchase.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: <Tag />, title: "Best Price", desc: "Direct from artist pricing" },
          { icon: <Truck />, title: "Worldwide Shipping", desc: "Carefully packaged & insured" },
          { icon: <Shield />, title: "Certificate of Authenticity", desc: "With every original piece" }
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-lg mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Shop Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ShopItemCard item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Shop;