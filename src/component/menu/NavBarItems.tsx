import { Link, useLocation } from "react-router-dom";

type NavBarItem = {
  label: string;
  href: string;
  img?: any;
};

type NavBarItemsProps = {
  items: NavBarItem[];
};

const NavBarItems = ({ items }: NavBarItemsProps) => {
  const location = useLocation();

  const hiderHeaderFooter = ["/"].includes(location.pathname);
  return (
    <div>
      {hiderHeaderFooter ? (
        <div className="flex justify-evenly text-center py-3   bg-white">
          {items.map((item) => (
            <div key={item.label}>
              <Link className="bg-white " to={item.href}>
                <img src={item.img} alt={item.label} />
                <span className="font-semibold">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-between text-center px-15 py-3 shadow  bg-blue-600 ">
          {items.map((item) => (
            <div key={item.label}>
              <Link className="text-white" to={item.href}>
                <span className="font-semibold">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBarItems;
