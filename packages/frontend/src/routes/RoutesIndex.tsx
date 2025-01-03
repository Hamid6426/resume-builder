import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Route protection wrappers (use these after completing all page because its annoying)
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

import App from "../pages/App";
import NotFound from "../pages/NotFound";

// INFO
import About from "../pages/info/About";
import Contact from "../pages/info/Contact";
import HowToUse from "../pages/info/HowToUse";

// AUTH
import AuthLayout from "../layouts/AuthLayout";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";


const RoutesIndex = () => {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<App />} />

      {/* Public Routes */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/how-to-use" element={<HowToUse />} />

      {/* AUTH */}
      <Route path="/auth" element={<AuthLayout><Outlet /></AuthLayout>}>
        <Route index element={<Navigate replace to="signup" />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Catch-All 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesIndex;
