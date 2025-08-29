import Banner from "../assets/banner.webp";
import NavBar from "../component/menu/NavBar";
import ProductCard from "../component/ProductCard";
import { products, categories } from "../data/products";
import Poster from "../assets/poster.webp";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <div>
        <NavBar />
      </div>

      {/* Banner */}
      <div className="py-5">
        <img src={Banner} className="w-full object-cover" alt="banner" />
      </div>

      <div className="space-y-5 ">
        {/* Mobiles Section */}
        <section className="w-full rounded-md bg-white p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            {categories.find((item) => item.id === "mobiles")?.name}
          </h2>
          <div className="flex gap-5 items-start">
            {/* Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 flex-1">
              {products
                .filter((category) => category.category === "mobiles")
                .slice(0, 5)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Poster */}
            <div className="hidden md:flex justify-center">
              <img src={Poster} alt="poster" className="w-48 sm:w-60 md:w-52" />
            </div>
          </div>
        </section>

        {/* Appliances Section */}
        <section className="py-5 px-4 md:px-7 rounded-md bg-white">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            {categories.find((item) => item.id === "appliances")?.name}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products

              .filter((category) => category.category === "appliances")
              .slice(0, 6)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
