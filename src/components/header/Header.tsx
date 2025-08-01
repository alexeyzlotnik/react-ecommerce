import "./header.css";

import Menu from "./Menu";
import Search from "./Search";
import LoginButtons from "../features/login-buttons/LoginButtons";
import Cart from "../features/cart/Cart";

function Header() {
  return (
    <header>
      <Menu />
      <Search />
      <Cart />
      <LoginButtons />
    </header>
  );
}

export default Header;
