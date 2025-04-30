import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css"

const Admin = () => {
  const [data, setData] = useState({
    kinerja: 0,
    ormawa: 0,
    fasilitas: 0,
    kebijakan: 0,
    seminar: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [res1, res2, res3, res4, res5] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/kinerja_dosen`),
        axios.get(`${import.meta.env.VITE_API_URL}/ormawa`),
        axios.get(`${import.meta.env.VITE_API_URL}/kerusakan_fasilitas`),
        axios.get(`${import.meta.env.VITE_API_URL}/kebijakan_kampus`),
        axios.get(`${import.meta.env.VITE_API_URL}/pengajuan_seminar`),
      ]);

      setData({
        kinerja: res1.data.length,
        ormawa: res2.data.length,
        fasilitas: res3.data.length,
        kebijakan: res4.data.length,
        seminar: res5.data.length,
      });
    } catch (err) {
      console.error('Gagal mengambil data dashboard', err);
    }
  };

  const Card = ({ title, count, color, textColor, buttonColor, link }) => (
    <div
      className={`w-full max-w-sm rounded-2xl p-8 ${color} shadow-md cursor-pointer transition-transform duration-300 hover:scale-105`}
      onClick={() => navigate(link)}
    >
      <h2 className={`text-xl gotham font-bold ${textColor} mb-2`}>{title}</h2>
      <p className="text-2xl gotham font-medium text-[#4a0000]">{count} Data</p>
      <button
        className={`mt-8 px-4 py-2 rounded-md cursor-pointer text-white gotham font-medium ${buttonColor}`}
      >
        Lihat Detail
      </button>
    </div>
  );
  

  return (
    <div className="px-6 sm:px-12 lg:px-32 py-8 bg-white min-h-screen pt-20">
      <h1 className="text-3xl gotham font-bold text-gray-800 mb-6 admin-dashboard">ADMIN DASHBOARD</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        title="Kinerja Dosen"
        count={data.kinerja}
        color="bg-[#FBBF6A]/25"
        textColor="text-[#F4B000]"
        buttonColor="bg-[#F4B000]"
        link="/admin/kinerja-dosen"
      />
      <Card
        title="Pengajuan Seminar"
        count={data.seminar}
        color="bg-[#DC7F5D]/25"
        textColor="text-[#DC7F5D]"
        buttonColor="bg-[#DC7F5D]"
        link="/admin/pengajuan-seminar"
      />
      <Card
        title="Kerusakan Fasilitas"
        count={data.fasilitas}
        color="bg-[#FBBF6A]/25"
        textColor="text-[#EBC75C]"
        buttonColor="bg-[#EBC75C]"
        link="/admin/kerusakan-fasilitas"
      />
      <Card
        title="Kebijakan Kampus"
        count={data.kebijakan}
        color="bg-[#DC7F5D]/25"
        textColor="text-[#DC7F5D]"
        buttonColor="bg-[#DC7F5D]"
        link="/admin/kebijakan-kampus"
      />
      <Card
        title="Ormawa"
        count={data.ormawa}
        color="bg-[#FBBF6A]/25"
        textColor="text-[#F4B000]"
        buttonColor="bg-[#F4B000]"
        link="/admin/ormawa"
      />
    </div>
  </div>  
  );
};

export default Admin;