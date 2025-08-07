import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Cart from "./Cart";
import cartReducer from "./cartSlice";

// Mock the CartPanel component
vi.mock("./CartPanel", () => ({
  default: ({ open, onClose }: { open: boolean; onClose: () => void }) => (
    <div data-testid="cart-panel" data-open={open}>
      <button onClick={onClose} data-testid="close-cart">
        Close Cart
      </button>
    </div>
  ),
}));

// Mock react-icons
vi.mock("react-icons/lu", () => ({
  LuShoppingBasket: () => <div data-testid="shopping-basket-icon">🛒</div>,
}));

// Mock Chakra UI Button
vi.mock("@chakra-ui/react", () => ({
  Button: ({ children, onClick, variant }: any) => (
    <button onClick={onClick} data-variant={variant} data-testid="cart-button">
      {children}
    </button>
  ),
}));

// Create a test store
const createTestStore = (initialState: any = { cart: [] }) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: initialState,
  });
};

describe("Cart Component", () => {
  let store: any;

  beforeEach(() => {
    // Reset store before each test
    store = createTestStore();
  });

  // Test 1: Renders cart button with correct count
  it("renders cart button with correct item count", () => {
    const initialState = {
      cart: [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
      ],
    };
    store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const cartButton = screen.getByTestId("cart-button");
    expect(cartButton).toBeInTheDocument();
    expect(cartButton).toHaveTextContent("2"); // Should show count of 2 items
  });

  // Test 2: Shows zero count when cart is empty
  it("shows zero count when cart is empty", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const cartButton = screen.getByTestId("cart-button");
    expect(cartButton).toHaveTextContent("0");
  });

  // Test 3: Opens cart panel when button is clicked
  it("opens cart panel when button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const cartButton = screen.getByTestId("cart-button");

    // Initially, cart panel should be closed
    const cartPanel = screen.getByTestId("cart-panel");
    expect(cartPanel).toHaveAttribute("data-open", "false");

    // Click the cart button
    fireEvent.click(cartButton);

    // Cart panel should now be open
    expect(cartPanel).toHaveAttribute("data-open", "true");
  });

  // Test 4: Closes cart panel when close button is clicked
  it("closes cart panel when close button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const cartButton = screen.getByTestId("cart-button");
    const cartPanel = screen.getByTestId("cart-panel");
    const closeButton = screen.getByTestId("close-cart");

    // Open the cart
    fireEvent.click(cartButton);
    expect(cartPanel).toHaveAttribute("data-open", "true");

    // Close the cart
    fireEvent.click(closeButton);
    expect(cartPanel).toHaveAttribute("data-open", "false");
  });

  // Test 5: Displays shopping basket icon
  it("displays shopping basket icon", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const icon = screen.getByTestId("shopping-basket-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent("🛒");
  });

  // Test 6: Button has correct variant
  it("cart button has correct variant", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const cartButton = screen.getByTestId("cart-button");
    expect(cartButton).toHaveAttribute("data-variant", "subtle");
  });

  // Test 7: Handles multiple rapid clicks correctly
  it("handles multiple rapid clicks correctly", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const cartButton = screen.getByTestId("cart-button");
    const cartPanel = screen.getByTestId("cart-panel");

    // Click multiple times rapidly
    fireEvent.click(cartButton);
    fireEvent.click(cartButton);
    fireEvent.click(cartButton);

    // Should still be open (not toggle behavior)
    expect(cartPanel).toHaveAttribute("data-open", "true");
  });

  // Test 8: Updates count when store state changes
  it("updates count when store state changes", () => {
    const { rerender } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Initially empty
    expect(screen.getByTestId("cart-button")).toHaveTextContent("0");

    // Update store with items
    const newStore = createTestStore({
      cart: [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
        { id: 3, name: "Product 3", price: 30 },
      ],
    });

    rerender(
      <Provider store={newStore}>
        <Cart />
      </Provider>
    );

    // Should now show count of 3
    expect(screen.getByTestId("cart-button")).toHaveTextContent("3");
  });

  // Test 9: Accessibility - button is clickable
  it("cart button is accessible and clickable", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const cartButton = screen.getByTestId("cart-button");
    expect(cartButton).toBeEnabled();
    expect(cartButton).toHaveAttribute("data-variant");
  });

  // Test 10: Component renders without crashing
  it("renders without crashing", () => {
    expect(() => {
      render(
        <Provider store={store}>
          <Cart />
        </Provider>
      );
    }).not.toThrow();
  });
});

// Integration test example - testing with real Redux actions
describe("Cart Component Integration", () => {
  it("integrates with Redux store correctly", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    // Verify initial state
    const state = store.getState();
    expect(state.cart).toEqual([]);

    // Verify component reflects store state
    expect(screen.getByTestId("cart-button")).toHaveTextContent("0");
  });
});
