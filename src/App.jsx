import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Setting from "./pages/Setting";
import NotFound from "./pages/NotFound";
import AddProductForm from "./features/products/AddProductForm";
import Transections from "./pages/Transections";
import Payouts from "./pages/Payouts";
import Analytics from "./pages/Analytics";
import CustomerProfile from "./features/customers/CustomerProfile/CustomerProfile";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<GuestRoute><AuthLayout /></GuestRoute>}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProductForm />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerProfile />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/transactions" element={<Transections />} />
        <Route path="/transections" element={<Navigate to="/transactions" replace />} />
        <Route path="/payouts" element={<Payouts />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}