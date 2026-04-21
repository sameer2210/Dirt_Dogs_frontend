import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] px-5 mt-20 md:mt-24">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
