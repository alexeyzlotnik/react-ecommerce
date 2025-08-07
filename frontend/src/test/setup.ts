import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock react-icons
vi.mock("react-icons/lu", () => ({
  LuShoppingBasket: () => React.createElement("div", {}, "ShoppingBasketIcon"),
  LuArrowRightFromLine: () => React.createElement("div", {}, "ArrowRightIcon"),
  LuTrash: () => React.createElement("div", {}, "TrashIcon"),
}));

// Mock Chakra UI components
vi.mock("@chakra-ui/react", () => ({
  Button: ({ children, onClick, variant }: any) =>
    React.createElement(
      "button",
      { onClick, "data-variant": variant },
      children
    ),
  Drawer: {
    Root: ({ children, open }: any) =>
      open
        ? React.createElement("div", { "data-testid": "drawer" }, children)
        : null,
    Portal: ({ children }: any) =>
      React.createElement("div", { "data-testid": "portal" }, children),
    Backdrop: () => React.createElement("div", { "data-testid": "backdrop" }),
    Positioner: ({ children }: any) =>
      React.createElement("div", { "data-testid": "positioner" }, children),
    Content: ({ children }: any) =>
      React.createElement("div", { "data-testid": "content" }, children),
    Header: ({ children }: any) =>
      React.createElement("div", { "data-testid": "header" }, children),
    Title: ({ children }: any) =>
      React.createElement("div", { "data-testid": "title" }, children),
    Body: ({ children }: any) =>
      React.createElement("div", { "data-testid": "body" }, children),
    Footer: ({ children }: any) =>
      React.createElement("div", { "data-testid": "footer" }, children),
    CloseTrigger: ({ children }: any) =>
      React.createElement("div", { "data-testid": "close-trigger" }, children),
  },
  CloseButton: ({ size, onClick }: any) =>
    React.createElement(
      "button",
      {
        onClick,
        "data-size": size,
        "data-testid": "close-button",
      },
      "Close"
    ),
  Table: {
    Root: ({ children, size }: any) =>
      React.createElement("table", { "data-size": size }, children),
    Header: ({ children }: any) => React.createElement("thead", {}, children),
    Row: ({ children }: any) => React.createElement("tr", {}, children),
    ColumnHeader: ({ children, textAlign }: any) =>
      React.createElement("th", { style: { textAlign } }, children),
    Body: ({ children }: any) => React.createElement("tbody", {}, children),
    Cell: ({ children, textAlign }: any) =>
      React.createElement("td", { style: { textAlign } }, children),
  },
}));
