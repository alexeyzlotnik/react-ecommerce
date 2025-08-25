import { Link } from "react-router";

interface MenuProps {
  onItemClick?: () => void;
}

function Menu({ onItemClick }: MenuProps) {
  const menuElements = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Shop",
      url: "/shop",
    },
    // {
    //   name: "Featured",
    //   url: "#",
    // },
  ];

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  const menuItems = menuElements.map((item, index) => (
    <li className="menu-item" key={index}>
      <Link to={item.url} className="menu-item__link" onClick={handleItemClick}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <nav className="menu-wrapper">
      <ul className="menu">{menuItems}</ul>
    </nav>
  );
}

export default Menu;
