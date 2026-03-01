import React from "react";
import LaporanKerusakanFasilitas from "../Component/LaporanKerusakanFasilitas";
import NavbarPages from "../Component/NavbarPages"
import Footer from "../Component/Footer";

const LaporanKerusakanFasilitasPage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <NavbarPages/>
        <LaporanKerusakanFasilitas />
        <Footer />
      </div>
    </main>
  );
};

export default LaporanKerusakanFasilitasPage;