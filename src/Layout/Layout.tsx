import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "../component/menu/NavBar";

const Layout = () => {
  const location = useLocation();

  // login page-க்கு header/footer hide
  const hideHeaderFooter = ["/login"].includes(location.pathname);
 

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      {!hideHeaderFooter && <Header />}

      {/* Main Content */}
      <main className="flex-1 container mx-auto w-full px-4 py-4">
        
        <Outlet />
      </main>

      {/* Footer */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
