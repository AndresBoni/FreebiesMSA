import React from "react";
import Navbar from "./components/Navbar/Navbar";
import CustomerHomePage from "./pages/CustomerHomePage/CustomerHomePage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <CustomerHomePage />
    </>
  );
};

export default App;
