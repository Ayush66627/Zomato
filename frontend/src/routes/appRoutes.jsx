import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import PartnerLogin from "./PartnerLogin";
import PartnerRegister from "./PartnerRegister";
import Home from "./general/Home";
import CreateFood from "./food-partner/CreateFood";
import Profile from "./food-partner/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-food" element={<CreateFood />} />
      <Route path="/foodpartner/:id" element={<Profile />} />

      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />

      <Route path="/partner/login" element={<PartnerLogin />} />
      <Route path="/partner/register" element={<PartnerRegister />} />
    </Routes>
  );
};

export default AppRoutes;
