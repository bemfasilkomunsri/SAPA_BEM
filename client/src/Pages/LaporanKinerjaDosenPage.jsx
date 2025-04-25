import React from "react";
import LaporanKinerjaDosen from "../Component/LaporanKinerjaDosen";
import NavbarPages from "../Component/NavbarPages"
import Footer from "../Component/Footer";

const LaporanKinerjaDosenPage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <NavbarPages/>
        <LaporanKinerjaDosen />
        <Footer />
      </div>
    </main>
  );
};

export default LaporanKinerjaDosenPage;