import React from 'react';
import { ShoppingBag, Gift, Trophy, DollarSign, Tag, Clock } from 'lucide-react';

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

const TokenShop: React.FC = () => {
  const [userTokens] = React.useState(450); // This would typically come from your app state

  return (
    <section className="p-4 md:p-6 space-y-6">
      {/* Token Balance */}
      <div className="bg-white p-4 rounded-lg border border-neutral-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-yellow-100">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Token Balance</p>
              <p className="text-xl font-semibold">{userTokens} tokens</p>
            </div>
          </div>
          <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            View History
          </button>
        </div>
      </div>

      {/* Shop Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-neutral-200/30 hover:border-indigo-500 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-purple-100 mb-2">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <p className="font-medium">Merch</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200/30 hover:border-indigo-500 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-blue-100 mb-2">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <p className="font-medium">Courses</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200/30 hover:border-indigo-500 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-yellow-100 mb-2">
              <Gift className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="font-medium">Premium</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200/30 hover:border-indigo-500 transition-colors cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-green-100 mb-2">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-medium">Discounts</p>
          </div>
        </div>
      </div>

      {/* Featured Items */}
      <div className="bg-white rounded-lg border border-neutral-200/30 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold">Featured Rewards</h2>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <select className="px-4 py-2 border border-neutral-200/30 rounded-lg w-full sm:w-auto">
              <option>All Categories</option>
              <option>Merch</option>
              <option>Courses</option>
              <option>Premium</option>
              <option>Discounts</option>
            </select>
            <select className="px-4 py-2 border border-neutral-200/30 rounded-lg w-full sm:w-auto">
              <option>Sort By</option>
              <option>Newest</option>
              <option>Popular</option>
              <option>Token Cost: Low to High</option>
              <option>Token Cost: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ShopItem
            title="Limited Edition Dev T-Shirt"
            description="Exclusive cotton t-shirt with our developer community logo"
            tokenCost={200}
            category="Merch"
            availability={50}
            onRedeem={() => console.log('Redeeming t-shirt')}
          />
          <ShopItem
            title="Advanced React Course"
            description="Get lifetime access to our premium React course"
            tokenCost={500}
            category="Course"
            availability={10}
            expiresIn="5 days"
            onRedeem={() => console.log('Redeeming course')}
          />
          <ShopItem
            title="1 Month Premium Access"
            description="Get access to all premium features and courses for 1 month"
            tokenCost={300}
            category="Premium"
            availability={0}
            expiresIn="3 days"
            onRedeem={() => console.log('Redeeming premium')}
          />
          <ShopItem
            title="$50 Learning Credits"
            description="Get $50 worth of credits for any course purchase"
            tokenCost={400}
            category="Discount"
            availability={100}
            expiresIn="7 days"
            onRedeem={() => console.log('Redeeming credits')}
          />
        </div>
      </div>
    </section>
  );
};

export default TokenShop;