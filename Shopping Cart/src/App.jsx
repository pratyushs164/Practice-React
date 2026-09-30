import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import ItemCard from "./ItemCard";
import Header from "./Header";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const showComponent = function () {
    setShowCart((prev) => !prev);
  };

  const items = [
    { id: 1, product: "Jug", price: "$5", source: "./assets/dummy_image.jpg" },
    {
      id: 2,
      product: "Watch",
      price: "$30",
      source: "./assets/dummy_image.jpg",
    },
    {
      id: 3,
      product: "Earphones",
      price: "$7",
      source: "./assets/dummy_image.jpg",
    },
    {
      id: 4,
      product: "Shirt",
      price: "$20",
      source: "./assets/dummy_image.jpg",
    },
  ];

  const addToCart = function (id) {
    const prod = items.find((item) => item.id === id);
    if (!cart.find((item) => item.id === id)) {
      setCart((prev) => [...prev, prod]);
    }
  };

  const removeFromCart = function (id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem("items"));
    if (cartItem && cartItem.length > 0) {
      setCart(cartItem);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <Header cartCount={cart && cart.length} showComponent={showComponent} />

      <div className="flex flex-wrap justify-center gap-8 px-6 pt-10">
        {!showCart
          ? items.map((item) => (
              <ItemCard
                {...item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
                key={item.id}
              />
            ))
          : cart.map((item) => (
              <ItemCard
                {...item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
                key={item.id}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
