import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  calculateTotals,
} from "../store/slices/cartSlice";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import Button from "../component/ui/button";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, total, itemCount, tax, grandTotal, shipping } = useAppSelector(
    (state) => state.cart
  );

  // ✅ Calculate totals whenever cart changes
  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleRemoveItem = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const handleUpdateQuantity = useCallback(
    (id: string, newQuantity: number) => {
      if (newQuantity >= 1) {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
      }
    },
    [dispatch]
  );

  // ✅ Empty cart message
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Start shopping to add items to your cart.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Cart
            </h1>
            <p className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Link
            to="/cart"
            className="inline-flex items-center border border-gray-300 rounded-md p-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
        {/* ✅ Cart Items Section */}
        <div className="lg:col-span-2 shadow-md bg-white border border-gray-200 ">
          <div className="bg-card rounded-lg shadow-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Cart Items
              </h2>
              <Button
                className="border border-gray-300 rounded-md p-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleClearCart}
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.category}
                    </p>
                    <p className="text-lg font-bold text-foreground mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      className="border border-gray-300 rounded-md p-2"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      className="border border-gray-300 rounded-md p-2"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* ✅ Remove Button */}
                  <div className="flex text-center items-center gap-3">
                    <p className="font-bold text-foreground">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 border border-gray-300 rounded-md p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-card p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%)</span>
                    <span>₹ {tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `₹ ${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
