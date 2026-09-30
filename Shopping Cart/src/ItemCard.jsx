import React from "react";
import image from "./assets/dummy_image.jpg";

function ItemCard(props) {
  const prod = props.cart.find((item) => item.id === props.id);
  return (
    <div className="flex justify-center transition-transform hover:scale-105">
      <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
        <div className="h-48 w-full bg-gray-50 p-4 border-b border-gray-100">
          <img
            src={props.source}
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>

        <div className="px-5 pt-5 text-xl font-bold text-gray-800 truncate">
          {props.product}
        </div>

        <div className="px-5 pb-5 pt-1 text-lg text-gray-500 font-medium">
          {props.price}
        </div>

        {!prod ? (
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 mt-auto transition-colors"
            onClick={() => {
              props.addToCart(props.id);
            }}
          >
            Add to cart
          </button>
        ) : (
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 mt-auto transition-colors"
            onClick={() => {
              props.removeFromCart(props.id);
            }}
          >
            Remove from cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
