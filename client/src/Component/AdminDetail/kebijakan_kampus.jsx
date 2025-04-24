import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KebijakanKampusList = () => {
  const [laporan, setLaporan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLaporan();
  }, []);

  const getLaporan = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/kebijakan_kampus`
      );
      setLaporan(res.data);
    } catch (err) {
      console.error("Gagal memuat data", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus laporan ini?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/kebijakan_kampus/${id}`
        );
        getLaporan(); // Refresh data setelah hapus
      } catch (err) {
        console.error("Gagal menghapus", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Laporan Kebijakan Kampus</h1>
      <table className="min-w-full border bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Isi Laporan</th>
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {laporan.map((item, index) => (
            <tr key={item.id}>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{item.nama}</td>
              <td className="p-2 border">{item.laporan}</td>
              <td className="p-2 border">{item.tanggal}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => navigate(`/admin/kebijakan-kampus/${item.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Detail
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {laporan.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Belum ada laporan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KebijakanKampusList;
