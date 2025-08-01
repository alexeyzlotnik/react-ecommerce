import { useState } from "react";
import "./app.css";
import ProductList from "../components/features/product-list/ProductList";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Cart from "../components/features/cart/Cart";

function App() {
  return (
    <>
      <DefaultLayout>
        <ProductList />
      </DefaultLayout>
    </>
  );
}

export default App;
