import React, { useRef, useEffect, useState } from "react";
import { Element, useNavigate } from "react-scroll";
import { useNavigate as useRouterNavigate } from "react-router-dom";

const categories = [
  { id: 1, title: "Kinerja Dosen", link: "/laporan-kinerja-dosen" },
  { id: 4, title: "Kebijakan Kampus", link: "/laporan-kebijakan-kampus" },
  { id: 2, title: "Kerusakan Fasilitas", link: "/laporan-kerusakan-fasilitas" },
  { id: 5, title: "Aspirasi Ormawa", link: "/laporan-ormawa" },
  { id: 3, title: "Pengajuan Seminar", link: "/laporan-pengajuan-seminar" },
];

export default function ReportFormUI() {
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [showAlert, setShowAlert] = useState(false); 
  const navigate = useRouterNavigate(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-animate");
          } else {
            entry.target.classList.remove("fade-up-animate");
          }
        });
      },
      { threshold: 0.3 }
    );
  
    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));
  
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleCardClick = (link, id) => {
    setSelectedCategory({ link, id }); 
    setShowAlert(false); 
    navigate(link); 
  };

  const handleReportClick = () => {
    if (!selectedCategory) {
      setShowAlert(true); 
    } else {
      navigate(selectedCategory.link); 
    }
  };

  return (
    <Element name="laporan">
      <div className="min-h-screen pt-[10rem] flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-10 max-w-7xl">
          {/* Cards section */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-6">
            {/* Left column - 3 cards */}
            <div className="flex flex-col gap-6">
              {[categories[0], categories[2], categories[4]].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item.link, item.id)}
                  className={`w-64 fade-up h-40 rounded-xl border p-3 flex flex-col justify-between shadow-sm transition-transform duration-200 ${
                    selectedCategory && selectedCategory.id === item.id
                      ? "border-[#FFEBBC] text-[#FFEBBC]" 
                      : "border-gray-400 text-gray-800"
                  } hover:scale-105 hover:shadow-md`}
                >
                  <span className="text-2xl max-w-[10rem] font-medium">
                    {item.title}
                  </span>
                  <span className="text-sm text-gray-400 self-end">{item.id}</span>
                </button>
              ))}
            </div>

            {/* Right column - 2 cards */}
            <div className="flex flex-col gap-6 lg:justify-center">
              {[categories[1], categories[3]].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item.link, item.id)}
                  className={`w-64 fade-up h-40 rounded-xl border p-3 flex flex-col justify-between shadow-sm transition-transform duration-200 ${
                    selectedCategory && selectedCategory.id === item.id
                      ? "border-[#FFEBBC] text-[#FFEBBC]" 
                      : "border-gray-400 text-gray-800"
                  } hover:scale-105 hover:shadow-md`}
                >
                  <span className="text-2xl max-w-[10rem] font-medium">
                    {item.title}
                  </span>
                  <span className="text-sm text-gray-400 self-end">{item.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right content */}
          <div className="fade-up max-w-sm pt-16 lg:pt-0 text-center lg:text-left">
            <h2 className="text-2xl font-semibold mb-2">Form Pelaporan</h2>
            <p className="text-sm text-gray-600 mb-4">
              Sampaikan permasalahan yang kamu hadapi di lingkungan kampus
              Fasilkom UNSRI. Pilih kategori yang sesuai, dan laporanmu akan
              diproses untuk menemukan solusi terbaik bersama pihak terkait.
            </p>
            {showAlert && (
              <p className="text-sm text-red-600 font-semibold mb-4">
                Pililah salah satu kategori laporan yang anda inginkan!
              </p>
            )}
            <button
              onClick={handleReportClick}
              className={`flex font-normal items-center mx-auto lg:mx-0 cursor-pointer gap-2 px-4 py-2 bg-[#4A0000] border border-[#4A0000] text-white hover:bg-[#FFEBBC] hover:text-[#000000] duration-300 rounded-md text-sm`}
            >
              Lapor sekarang
            </button>
          </div>
        </div>
      </div>
    </Element>
  );
}