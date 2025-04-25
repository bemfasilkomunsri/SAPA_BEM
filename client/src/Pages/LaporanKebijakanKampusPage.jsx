import React from "react";
import LaporanKebijakanKampus from "../Component/LaporanKebijakanKampus";
import NavbarPages from "../Component/NavbarPages";
import Footer from "../Component/Footer";

const LaporanKebijakanKampusPage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <NavbarPages/>
        <LaporanKebijakanKampus/>
        <Footer />
      </div>
    </main>
  );
};

export default LaporanKebijakanKampusPage;