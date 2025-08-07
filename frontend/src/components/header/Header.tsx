import "./header.css";

import Menu from "./Menu";
import Search from "./Search";
import LoginButtons from "../features/login-buttons/LoginButtons";
import Cart from "../features/cart/Cart";
import { ColorModeButton } from "../ui/color-mode";
import { useAuth } from "../../contexts/AuthContext";
import AppButton from "../ui/AppButton";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header>
      <Menu />
      <Search />
      <Cart />
      <ColorModeButton />

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.name}!</span>
          <AppButton variant="secondary" size="sm" onClick={logout}>
            Logout
          </AppButton>
        </div>
      ) : (
        <LoginButtons />
      )}
    </header>
  );
}

export default Header;
