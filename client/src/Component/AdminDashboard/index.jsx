import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [data, setData] = useState({
    kinerja: 0,
    ormawa: 0,
    fasilitas: 0,
    kebijakan: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [res1, res2, res3, res4] = await Promise.all([
        axios.get('http://localhost:5000/kinerja_dosen'),
        axios.get('http://localhost:5000/ormawa'),
        axios.get('http://localhost:5000/kerusakan_fasilitas'),
        axios.get('http://localhost:5000/kebijakan_kampus'),
      ]);

      setData({
        kinerja: res1.data.length,
        ormawa: res2.data.length,
        fasilitas: res3.data.length,
        kebijakan: res4.data.length,
      });
    } catch (err) {
      console.error('Gagal mengambil data dashboard', err);
    }
  };

  const Card = ({ title, count, color, link }) => (
    <div
      className={`rounded-xl p-6 text-white shadow-lg transition-all transform hover:scale-105 hover:shadow-xl ${color} hover:bg-opacity-90 cursor-pointer`}
      onClick={() => navigate(link)}
    >
      <h2 className="text-lg font-semibold uppercase">{title}</h2>
      <p className="text-4xl font-bold mt-2">{count}</p>
      <p className="text-sm underline mt-2 opacity-80">Lihat Detail</p>
    </div>
  );

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-pink-50 min-h-screen pt-20">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Dashboard Admin GASPOL</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card
          title="Kinerja Dosen"
          count={data.kinerja}
          color="bg-cyan-600"
          link="/admin/kinerja-dosen"
        />
        <Card
          title="Pengajuan Seminar"
          count={data.ormawa}
          color="bg-green-600"
          link="/admin/pengajuan-seminar"
        />
        <Card
          title="Kerusakan Fasilitas"
          count={data.fasilitas}
          color="bg-red-600"
          link="/admin/kerusakan-fasilitas"
        />
        <Card
          title="Kebijakan Kampus"
          count={data.kebijakan}
          color="bg-yellow-600"
          link="/admin/kebijakan-kampus"
        />
        <Card
          title="Ormawa"
          count={data.ormawa}
          color="bg-gray-700"
          link="/admin/ormawa"
        />
      </div>
    </div>
  );
};

export default Admin;