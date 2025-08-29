import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCallback, useMemo } from "react";
import { removeFromWishlist } from "../store/slices/wishlistSlice";
import Button from "../component/ui/button";

const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, itemCount } = useAppSelector((state) => state.wishlist);

  // ✅ Function to remove a single item
  const handleRemoveItem = useCallback(
    (id: string) => {
      dispatch(removeFromWishlist(id));
    },
    [dispatch]
  );

  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
  }, [items]);

  // ✅ Show empty state if wishlist is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center py-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Wishlist</h2>
          <p className="text-muted-foreground mb-6">
            Your wishlist is currently empty.
          </p>

          <Link
            to="/"
            className="text-white bg-[#0d61fd] px-4 py-2 rounded-md mt-2"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
      <p className="text-muted-foreground mb-6">
        {itemCount} {itemCount === 1 ? "item" : "items"} saved
      </p>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-lg shadow-card overflow-hidden group"
          >
            <div className="relative">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* ✅ Remove from wishlist button */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>

              {/* ✅ Discount badge */}
              {item.originalPrice && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-bold">
                  -
                  {Math.round(
                    ((item.originalPrice - item.price) / item.originalPrice) *
                      100
                  )}
                  %
                </div>
              )}

              {/* ✅ Out of stock overlay */}
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* ✅ Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">
                {item.name}
              </h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm text-muted-foreground ml-1">
                    {item.rating} ({item.reviews})
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ">
                <p className="text-lg font-bold text-foreground">
                  ${item.price}
                </p>

                {item.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    ${item.originalPrice}
                  </p>
                )}
              </div>
            </div>

            <div className="">
              <Button
                className="text-white bg-[#0d61fd] flex items-center justify-center w-full py-2 rounded-md mt-2 "
                disabled={!item.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Added {new Date(item.dateAdded).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
