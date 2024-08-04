import React from "react";
import Navbar from "./components/Navbar/Navbar";
import CustomerHomePage from "./pages/CustomerHomePage/CustomerHomePage";
import { Route, Routes } from "react-router-dom";
import CompanyHomePage from "./pages/CompanyHomePage/CompanyHomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Copyright from "./components/Copyright";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/company" element={<CompanyHomePage />} />
        <Route path="/:location?/:district?" element={<CustomerHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/:type?" element={<SignUp />} />
      </Routes>
      <Copyright />
    </>
  );
};

export default App;
