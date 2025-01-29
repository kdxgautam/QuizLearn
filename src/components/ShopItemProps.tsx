import React from 'react';
import { ShoppingBag, DollarSign, Clock } from 'lucide-react';

interface ShopItemProps {
  title: string;
  description: string;
  tokenCost: number;
  category: 'Merch' | 'Course' | 'Premium' | 'Discount';
  availability: number;
  expiresIn?: string;
  imageUrl?: string;
  onRedeem: () => void;
}

const ShopItem: React.FC<ShopItemProps> = ({
  title,
  description,
  tokenCost,
  category,
  availability,
  expiresIn,
  imageUrl,
  onRedeem
}) => {
  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'Merch':
        return 'bg-purple-100 text-purple-600';
      case 'Course':
        return 'bg-blue-100 text-blue-600';
      case 'Premium':
        return 'bg-yellow-100 text-yellow-600';
      case 'Discount':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200/30 p-4 hover:border-indigo-500 transition-colors">
      <div className="flex flex-col h-full">
        <div className="relative mb-4">
          <img 
            src={imageUrl || "/api/placeholder/400/200"} 
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <span className={`absolute top-2 right-2 px-3 py-1 text-sm rounded-full ${getCategoryStyle(category)}`}>
            {category}
          </span>
        </div>
        
        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-3 mb-4">
            {availability > 0 && (
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <ShoppingBag className="w-4 h-4" />
                {availability} left
              </span>
            )}
            {expiresIn && (
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Expires in {expiresIn}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-200/30">
          <div className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-lg">{tokenCost}</span>
            <span className="text-sm text-gray-500">tokens</span>
          </div>
          <button
            onClick={onRedeem}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;