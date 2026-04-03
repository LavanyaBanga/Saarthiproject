import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, ChevronLeft, Store, Plus, Minus, X } from 'lucide-react';


const colors = {
  bg: "#776982",
  card: "#C7B9D6",
  text: "#4B4155",
  highlight: "#9B6EB4",
  lightCard: "#F8F5FB",
  border: "#A597D4",
};


const products = [
  {
    id: 1,
    name: "Herbal Tea Blend",
    price: 19.99,
    image: "https://www.botanicamedicines.com.au/cdn/shop/products/HerbalTea_2000x1335.jpg?v=1670832625",
    initialDescription: "A calming tea for relaxation."
  },
  {
    id: 2,
    name: "Meditation Pillow",
    price: 45.50,
    image: "https://m.media-amazon.com/images/I/517X6R+t8LL._AC_.jpg",
    initialDescription: "Comfortable support for your practice."
  },
  {
    id: 3,
    name: "Aromatherapy Diffuser",
    price: 35.00,
    image: "https://greencairoindia.com/wp-content/uploads/2020/10/hair-oil-500ml_1.png",
    initialDescription: "Essential oils for a peaceful atmosphere."
  },
  {
    id: 4,
    name: "Journal & Pen Set",
    price: 25.25,
    image: "https://m.media-amazon.com/images/I/71uUf-CbVJL._AC_.jpg",
    initialDescription: "For mindful writing and reflection."
  },
  {
    id: 5,
    name: "Yoga Mat",
    price: 39.99,
    image: "https://thumbs.dreamstime.com/b/purple-yoga-mat-flower-outdoor-healthy-sport-concept-251584764.jpg",
    initialDescription: "An extra-thick mat for your daily yoga."
  },
  {
    id: 6,
    name: "Mindful Coloring Book",
    price: 12.50,
    image: "https://www.harryhartog.com.au/cdn/shop/files/9781398835047.jpg?v=1736277189&width=480",
    initialDescription: "Creative art for stress relief."
  },
  {
    id: 7,
    name: "Weighted Blanket",
    price: 79.00,
    image: "https://m.media-amazon.com/images/I/71l8KP8wS1L._AC_SL1500_.jpg",
    initialDescription: "For deep, restful sleep and calm."
  },
  {
    id: 8,
    name: "Herbal Supplements",
    price: 29.00,
    image: "https://thumbs.dreamstime.com/b/herbal-supplement-purple-thistle-flowers-milk-327838428.jpg",
    initialDescription: "Natural remedies for your well-being."
  },
];
const NavBar = ({ setActiveView, cartItems }) => (
  <nav
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 shadow-lg"
    style={{ backgroundColor: colors.bg, color: 'white' }}
  >
    <div className="text-2xl font-bold">Saarthi</div>
    <div className="flex space-x-4">
      <Button
        className="rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-md relative"
        style={{
          backgroundColor: colors.highlight,
          color: 'white',
          boxShadow: `0 0 0px ${colors.highlight}`
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 15px ${colors.highlight}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0px ${colors.highlight}`}
        onClick={() => setActiveView('cart')}
      >
        <ShoppingCart className="w-5 h-5 mr-2" /> Cart
        {cartItems.length > 0 && (
          <Badge
            className="absolute -top-1 -right-1"
            style={{ backgroundColor: colors.text, color: colors.card }}
          >
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </Badge>
        )}
      </Button>
      <Button
        variant="outline"
        className="rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-md"
        style={{ borderColor: colors.border, color: colors.text, backgroundColor: colors.card }}
        onClick={() => setActiveView('orders')}
      >
        <Package className="w-5 h-5 mr-2" /> My Orders
      </Button>
    </div>
  </nav>
);

const SideBar = ({ activeView, setActiveView, cartItems }) => (
  <motion.div
    initial={{ x: -200 }}
    animate={{ x: 0 }}
    transition={{ duration: 0.5 }}
    className="hidden lg:flex flex-col w-64 p-4 h-full fixed top-16 left-0 overflow-y-auto z-40 shadow-xl"
    style={{ backgroundColor: colors.card, borderRight: `1px solid ${colors.border}` }}
  >
    <div className="flex flex-col space-y-2 mt-4">
      <Button
        variant="ghost"
        className={`w-full justify-start px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-[#A597D4]/50 ${activeView === 'shop' ? 'bg-[#A597D4]/30' : ''}`}
        style={{ color: colors.text }}
        onClick={() => setActiveView('shop')}
      >
        <Store className="mr-2" /> Shop
      </Button>
      <Button
        variant="ghost"
        className={`w-full justify-start px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-[#A597D4]/50 ${activeView === 'cart' ? 'bg-[#A597D4]/30' : ''}`}
        style={{ color: colors.text }}
        onClick={() => setActiveView('cart')}
      >
        <ShoppingCart className="mr-2" /> Cart
        {cartItems.length > 0 && (
          <Badge
            className="ml-2"
            style={{ backgroundColor: colors.text, color: colors.card }}
          >
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </Badge>
        )}
      </Button>
      <Button
        variant="ghost"
        className={`w-full justify-start px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-[#A597D4]/50 ${activeView === 'orders' ? 'bg-[#A597D4]/30' : ''}`}
        style={{ color: colors.text }}
        onClick={() => setActiveView('orders')}
      >
        <Package className="mr-2" /> My Orders
      </Button>
    </div>
  </motion.div>
);


export default function ECommercePage() {
  const [productDescription, setProductDescription] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('shop');
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const generateDescription = async (productId, productName) => {
    setLoading(true);
    setProductDescription(prev => ({ ...prev, [productId]: 'Generating...' }));

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: `Write a short, creative product description for an item named: "${productName}". The description should be about 2-3 sentences long and focus on wellness and mental health benefits.` }] });

      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'Failed to generate a description.';

      setProductDescription(prev => ({ ...prev, [productId]: text }));

    } catch (error) {
      console.error("Error generating description:", error);
      setProductDescription(prev => ({ ...prev, [productId]: 'Could not generate a description. Please try again later.' }));
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productToAdd) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentItems, { ...productToAdd, quantity: 1 }];
      }
    });
    setActiveView('cart');
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(currentItems => {
      return currentItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
      ).filter(item => item.quantity > 0);
    });
  };

  const placeOrder = () => {
    if (cartItems.length > 0) {
      const newOrder = {
        id: new Date().getTime(),
        date: new Date().toLocaleDateString(),
        items: cartItems,
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };
      setOrders(currentOrders => [newOrder, ...currentOrders]);
      setCartItems([]);
      setActiveView('orders');
    }
  };

  const renderShopView = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white">Wellness Store</h1>
      </motion.div>

      <div className="flex flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: colors.card,
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 0 0px ${colors.highlight}`
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 15px ${colors.highlight}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0px ${colors.highlight}`}
              >
                <img src={product.image} alt={product.name} className="w-full h-72 object-cover" />
                <CardHeader className="p-4 pb-2">
                  <motion.div whileHover={{ x: 10 }}>
                    <CardTitle className="text-xl font-bold" style={{ color: colors.text }}>
                      {product.name}
                    </CardTitle>
                  </motion.div>
                  <p className="text-sm mt-2" style={{ color: colors.text }}>
                    {productDescription[product.id] || product.initialDescription}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex flex-col items-start gap-4">
                  <span className="text-2xl font-bold" style={{ color: colors.highlight }}>
                    ${product.price}
                  </span>
                  <div className="flex space-x-2 w-full">
                    <Button
                      className="rounded-full px-4 py-2 flex-1 transition-all duration-300 hover:scale-105 hover:shadow-md"
                      style={{
                        backgroundColor: colors.highlight,
                        color: 'white',
                        boxShadow: `0 0 0px ${colors.highlight}`
                      }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 10px ${colors.highlight}`}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0px ${colors.highlight}`}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full px-4 py-2 flex-1 transition-all duration-300 hover:scale-105 hover:shadow-md"
                      onClick={() => generateDescription(product.id, product.name)}
                      disabled={loading}
                      style={{ borderColor: colors.border, color: colors.text, backgroundColor: colors.card }}
                    >
                      {loading && productDescription[product.id] === 'Generating...' ? 'Generating...' : '✨ Generate Description'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );

  const renderCartView = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto w-full"
      >
        <Card
          className="rounded-2xl shadow-xl p-8"
          style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}
        >
          <CardHeader className="flex flex-row items-center gap-4 p-0 mb-4">
            <Button
              variant="ghost"
              className="rounded-full p-2 hover:bg-[#A597D4]/30"
              onClick={() => setActiveView('shop')}
              style={{ color: colors.text }}
            >
              <ChevronLeft size={24} />
            </Button>
            <CardTitle className="text-3xl font-bold">My Cart ({cartItems.length})</CardTitle>
          </CardHeader>

          {cartItems.length === 0 ? (
            <CardContent className="space-y-6 p-0 flex flex-col items-center justify-center h-64">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
              <p className="text-lg text-[#776982]">Your cart is currently empty.</p>
              <Button
                className="rounded-full px-6 py-3 mt-4"
                style={{ backgroundColor: colors.highlight, color: 'white' }}
                onClick={() => setActiveView('shop')}
              >
                Continue Shopping
              </Button>
            </CardContent>
          ) : (
            <CardContent className="p-0">
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 border-b pb-4"
                    style={{ borderColor: colors.border }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-xl font-bold" style={{ color: colors.text }}>{item.name}</p>
                      <p className="text-lg" style={{ color: colors.highlight }}>${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        style={{ borderColor: colors.border, color: colors.text, backgroundColor: colors.card }}
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold text-lg" style={{ color: colors.text }}>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        style={{ borderColor: colors.border, color: colors.text, backgroundColor: colors.card }}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-4 flex justify-between items-center" style={{ borderTop: `2px dashed ${colors.border}` }}>
                <span className="text-2xl font-bold" style={{ color: colors.text }}>Total:</span>
                <span className="text-3xl font-extrabold" style={{ color: colors.highlight }}>${total.toFixed(2)}</span>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  className="rounded-full px-8 py-4 text-lg"
                  style={{ backgroundColor: colors.highlight, color: 'white' }}
                  onClick={placeOrder}
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    );
  };

  const renderOrdersView = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto w-full"
    >
      <Card
        className="rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl"
        style={{
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 0 0px ${colors.highlight}`
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 15px ${colors.highlight}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0px ${colors.highlight}`}
      >
        <CardHeader className="flex flex-row items-center gap-4 p-0 mb-4">
          <Button
            variant="ghost"
            className="rounded-full p-2 transition-colors duration-200 hover:bg-[#A597D4]/30"
            onClick={() => setActiveView('shop')}
            style={{ color: colors.text }}
          >
            <ChevronLeft size={24} />
          </Button>
          <CardTitle className="text-3xl font-bold">My Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-0">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Package className="w-16 h-16 text-gray-400" />
              <p className="text-lg text-[#776982]">You have no recent orders.</p>
              <Button
                className="rounded-full px-6 py-3 mt-4"
                style={{ backgroundColor: colors.highlight, color: 'white' }}
                onClick={() => setActiveView('shop')}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, orderIndex) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: orderIndex * 0.2 }}
                  className="border rounded-xl p-4"
                  style={{ borderColor: colors.border, backgroundColor: colors.lightCard }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold" style={{ color: colors.text }}>Order #{orders.length - orderIndex}</h3>
                    <Badge style={{ backgroundColor: colors.highlight, color: 'white' }}>Order Placed</Badge>
                  </div>
                  <p className="text-sm" style={{ color: colors.text }}>Date: {order.date}</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: colors.text }}>Total: ${order.total.toFixed(2)}</p>
                  <ul className="mt-4 space-y-2">
                    {order.items.map(item => (
                      <li key={item.id} className="flex items-center space-x-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="font-semibold" style={{ color: colors.text }}>{item.name}</p>
                          <p className="text-sm" style={{ color: colors.text }}>Quantity: {item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderView = () => {
    switch (activeView) {
      case 'cart':
        return renderCartView();
      case 'orders':
        return renderOrdersView();
      case 'shop':
      default:
        return renderShopView();
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <NavBar setActiveView={setActiveView} cartItems={cartItems} />
      <div className="flex flex-1 pt-16">
        <SideBar activeView={activeView} setActiveView={setActiveView} cartItems={cartItems} />
        <main className="flex-1 p-6 lg:ml-64">
          {renderView()}
        </main>
      </div>
    </div>
  );
}