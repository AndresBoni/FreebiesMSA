import React from "react";
import Navbar from "./components/Navbar/Navbar";
import CustomerHomePage from "./pages/CustomerHomePage/CustomerHomePage";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/:location?/:district?" element={<CustomerHomePage />} />
      </Routes>
    </>
  );
};

export default App;
