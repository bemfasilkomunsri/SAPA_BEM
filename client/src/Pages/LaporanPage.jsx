import React from "react";
import LaporanLangsung from "../Component/LaporanLangsung";
import NavbarPages from "../Component/NavbarPages";
import Footer from "../Component/Footer";

const LaporanPage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <NavbarPages/>
        <LaporanLangsung />
        <Footer />
      </div>
    </main>
  );
};

export default LaporanPage;