import { Link } from "react-router-dom";
import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="text-center rounded-md flex justify-center ">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="mb-4  h-[152px] object-contain"
        />
        <h1 className="text-md font-[14px] mb-1 truncate w-36">
          {product.name}
        </h1>
        <p className="text-md font-semibold">From ₹ {product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
