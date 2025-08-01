import { Link } from "@chakra-ui/react";

function Menu() {
  const menuElements = [
    {
      name: "Home",
      url: "#",
    },
    {
      name: "Shop",
      url: "#",
    },
    {
      name: "Featured",
      url: "#",
    },
  ];

  const menuItems = menuElements.map((item, index) => (
    <li className="menu-item" key={index}>
      <Link href={item.url} className="menu-item__link">
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
