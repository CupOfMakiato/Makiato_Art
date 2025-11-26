import React, { useEffect } from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ContactPage from "../pages/ContactPage/ContactPage";
import TermOfService from "../pages/TermOfService/TermOfService";
import Faq from "../pages/Faq/Faq";
import CommissionPage from "../pages/CommissionPage/CommissionPage";

const AppRouter = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/commission" element={<CommissionPage />} />
      <Route path="/tos" element={<TermOfService />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<Faq />} />
    </Routes>
  );
};

export default AppRouter;
