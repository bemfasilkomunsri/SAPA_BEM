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
        axios.get('http://localhost:5000/pengajuan_seminar')
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
      className={`rounded-xl p-4 w-full md:w-[230px] text-white shadow cursor-pointer transition hover:scale-105 ${color}`}
      onClick={() => navigate(link)}
    >
      <h2 className="text-sm font-semibold uppercase">{title}</h2>
      <p className="text-3xl font-bold">{count}</p>
      <p className="underline text-sm mt-2">Lihat Detail</p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin GASPOL</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Kinerja Dosen"
          count={data.kinerja}
          color="bg-cyan-500"
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
          color="bg-yellow-500"
          link="/admin/kebijakan-kampus"
        />
        <Card
          title="Ormawa"
          count={data.kebijakan}
          color="bg-gray-500"
          link="/admin/ormawa"
        />
      </div>
    </div>
  );
};

export default Admin;