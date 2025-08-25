import "./header.css";

import Menu from "./Menu";
import Search from "./Search";
import LoginButtons from "../features/login-buttons/LoginButtons";
import Cart from "../features/cart/Cart";
import { ColorModeButton } from "../ui/color-mode";
import { useAuth } from "../../contexts/AuthContext";
import AppButton from "../ui/AppButton";
import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { Container } from "@chakra-ui/react";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <Container
        maxW="1200px"
        px={{ base: 4, sm: 6, md: 8 }}
        className="container flex !py-4 gap-1 items-center justify-between">
        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>

        {/* Logo/Brand - always visible */}
        <div className="header-brand">
          <h1 className="header-title">Cool Shop</h1>
        </div>

        {/* Desktop navigation */}
        <nav className="desktop-nav">
          <Menu />
        </nav>

        {/* Desktop search - hidden on mobile */}
        <div className="desktop-search">
          <Search />
        </div>

        {/* Desktop actions */}
        <div className="desktop-actions">
          <Cart />
          <ColorModeButton />
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">Welcome, {user?.name}!</span>
              <AppButton variant="secondary" size="sm" onClick={logout}>
                Logout
              </AppButton>
            </div>
          ) : (
            <LoginButtons />
          )}
        </div>

        {/* Mobile actions - always visible */}
        <div className="mobile-actions">
          <Cart />
          <ColorModeButton />
        </div>
      </Container>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <h2>Menu</h2>
            <button
              className="mobile-menu-close"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu">
              <LuX size={24} />
            </button>
          </div>

          <div className="mobile-menu-search">
            <Search />
          </div>

          <nav className="mobile-menu-nav">
            <Menu onItemClick={() => setIsMobileMenuOpen(false)} />
          </nav>

          <div className="mobile-menu-auth">
            {isAuthenticated ? (
              <div className="mobile-user-info">
                <span className="mobile-user-name">Welcome, {user?.name}!</span>
                <AppButton variant="secondary" size="sm" onClick={logout}>
                  Logout
                </AppButton>
              </div>
            ) : (
              <LoginButtons onItemClick={() => setIsMobileMenuOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
