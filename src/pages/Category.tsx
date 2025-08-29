import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCategoryCard from "../component/ProductCategoryCard";
import { useMemo } from "react";
import NavBar from "../component/menu/NavBar";

const Category = () => {
  const { name } = useParams<{ name: string }>();

  const categoryProducts = useMemo(() => {
    return products.filter((product) => product.category === name);
  }, [name]);

  return (
    <div>
      

      <div className="px-6 py-5">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6 capitalize">
          {name || "Category"}
        </h2>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {categoryProducts.map((product) => (
              <ProductCategoryCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
