import NavBarItems from "./NavBarItems";
import Surf from "../../assets/micon1.webp";
import Mobi from "../../assets/micon2.webp";
import fash from "../../assets/micon3.webp";
import Elct from "../../assets/micon4.webp";
import Chair from "../../assets/micon5.webp";
import HomeApp from "../../assets/micon6.webp";
import Booking from "../../assets/micon7.webp";
import Bike from "../../assets/micon8.webp";

const navItems = [
  // Add your navigation items here, for example:

  { label: "Mobile", href: "/category/mobiles", img: Mobi },
  {
    label: "Home Appliances",
    href: "/category/appliances",
    img: HomeApp,
  },
  {
    label: "Category",
    href: "/category",
    img: fash,
  },

  { label: "Surfing", href: "/", img: Surf },
  { label: "Chairs", href: "/", img: Chair },
  {
    label: "Home Appliances",

    href: "/",
    
     img: Elct,
  },
  { label: "Booking", href: "/", img: Booking },
  { label: "Bike Accessories", href: "/", img: Bike },
];

const NavBar = () => {
  return <NavBarItems items={navItems} />;
};

export default NavBar;
