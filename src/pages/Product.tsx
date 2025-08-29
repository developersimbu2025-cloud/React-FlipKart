import React, { useCallback, useMemo, useState } from "react";
import { products } from "../data/products";
import { useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Button from "../component/ui/button";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import WishlistButton from "../component/ui/WishlistButton";
const Product = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const product = id ? products.find((p) => p.id === id) : undefined;
  // // product.id might be a number in your dataset — so convert `id` to number
  // const product = id ? products.find((p) => String(p.id) === id) : undefined;

  // ✅ Update quantity safely (never less than 1)
  const updateQuantity = useCallback((newQuantity: number) => {
    console.log(newQuantity, "klk");
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  }, []);

 // ✅ Handle Add to Cart
  const handleAddToCart = useCallback(() => {
    console.log(product)
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: quantity,
        })
      );
    }
  }, [dispatch, product, quantity]);

  if (!product) {
    return (
      <div>
        <h1>Product Details</h1>
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ✅ Product Image */}
        <div className="relative">
          <img
            src={product.largeImage}
            alt={product.name}
            className="w-full max-h-[400px] object-contain rounded-lg shadow-lg border border-gray-200"
          />
        </div>

        {/* ✅ Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {product.name}
          </h1>

          {/* ✅ Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* ✅ Price */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-foreground">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* ✅ Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* ✅ Quantity & Add to Cart */}
          <div className="flex items-center space-x-4 mb-6 w-full">
            <div className="flex items-center border rounded-lg  ">
              <Button onClick={() => updateQuantity(quantity - 1)}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 min-w-[60px] text-center">
                {quantity}
              </span>
              <Button onClick={() => updateQuantity(quantity + 1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Full-Width Add to Cart Button */}
            <Button onClick={handleAddToCart} className="w-full bg-[#0d61fd] items-center text-white flex justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex  mb-3">
            <WishlistButton product={product} showText />
          </div>

          {/* ✅ Product Info */}
          <div className="border-t pt-5 border-gray-200">
            <dl className="space-y-2">
              <div className="flex">
                <dt className="font-medium text-foreground w-24">Category:</dt>
                <dd className="text-muted-foreground capitalize">
                  {product.category}
                </dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-foreground w-24">Stock:</dt>
                <dd
                  className={
                    product.inStock ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
