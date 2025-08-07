import "./app.css";
import DefaultLayout from "../components/layouts/DefaultLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import { Routes, Route } from "react-router";
import { RequireNoAuth } from "../components/auth/ProtectedRoute";

import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CategoryPage from "../pages/CategoryPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="product/:product" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="login"
            element={
              <RequireNoAuth redirectTo="/">
                <LoginPage />
              </RequireNoAuth>
            }
          />
          <Route
            path="register"
            element={
              <RequireNoAuth redirectTo="/">
                <RegisterPage />
              </RequireNoAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
