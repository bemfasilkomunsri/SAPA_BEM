import React from "react";
import LaporanPengajuanSeminar from "../Component/LaporanPengajuanSeminar";
import NavbarPages from "../Component/NavbarPages";
import Footer from "../Component/Footer";

const LaporanPengajuanSeminarPage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <NavbarPages/>
        <LaporanPengajuanSeminar />
        <Footer />
      </div>
    </main>
  );
};

export default LaporanPengajuanSeminarPage;