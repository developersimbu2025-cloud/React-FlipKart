import { Link } from "react-router-dom";
import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
};

const ProductCategoryCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="relative flex flex-col sm:flex-row bg-white shadow p-5 rounded-lg justify-between gap-4">
        {/* Left Side: Image + Info */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 flex-1">
          {/* Image */}
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="mt-3 sm:mt-0 flex flex-col justify-center">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500">{product.category}</p>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Effective Pixels: 8.8 MP</li>
              <li>Optical Zoom: 20-70mm T2.9 MFT Cine Zoom</li>
              <li>Sensor Type: BSI CMOS | LCD Size: 5 inch</li>
              <li>Max Shutter Speed: 1/5000th</li>
              <li>Manufacturer</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Price */}
        <div className="flex flex-col items-start sm:items-end ">
          <span className="text-lg sm:text-xl font-bold text-foreground">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through text-gray-500">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCategoryCard;
