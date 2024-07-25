import React from "react";
import Navbar from "./components/Navbar/Navbar";
import CustomerHomePage from "./pages/CustomerHomePage/CustomerHomePage";
import { Route, Routes } from "react-router-dom";
import CompanyHomePage from "./pages/CompanyHomePage/CompanyHomePage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/*TODO implement customer/company redirect*/}
        <Route path="/company" element={<CompanyHomePage />} />
        <Route path="/:location?/:district?" element={<CustomerHomePage />} />
      </Routes>
    </>
  );
};

export default App;
