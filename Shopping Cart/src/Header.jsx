import React from "react";

function Header({ cartCount, showComponent }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md flex items-center justify-between px-8 py-4">
      <div className="text-2xl font-black text-gray-900 tracking-tight">
        MiniStore
      </div>

      <div className="flex items-center gap-6">
        <div className="text-lg font-bold text-gray-700">
          🛒 Cart: <span className="text-blue-600">{cartCount}</span> items
        </div>

        <button
          className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm"
          onClick={() => {
            showComponent();
          }}
        >
          Toggle Cart
        </button>
      </div>
    </header>
  );
}

export default Header;
