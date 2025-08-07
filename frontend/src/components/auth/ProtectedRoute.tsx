import React, { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  requireAuth?: boolean; // true = require auth, false = require no auth
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
  requireAuth = true,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If we require authentication and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If we require no authentication and user is authenticated (e.g., login page)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Convenience components
export const RequireAuth: React.FC<{
  children: ReactNode;
  redirectTo?: string;
}> = ({ children, redirectTo }) => (
  <ProtectedRoute requireAuth={true} redirectTo={redirectTo}>
    {children}
  </ProtectedRoute>
);

export const RequireNoAuth: React.FC<{
  children: ReactNode;
  redirectTo?: string;
}> = ({ children, redirectTo }) => (
  <ProtectedRoute requireAuth={false} redirectTo={redirectTo}>
    {children}
  </ProtectedRoute>
);
