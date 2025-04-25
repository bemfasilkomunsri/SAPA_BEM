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
        `${import.meta.env.VITE_API_URL}/kerusakan_fasilitas`
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
          `${import.meta.env.VITE_API_URL}/kerusakan_fasilitas/${id}`
        );
        getLaporan(); // Refresh data setelah hapus
      } catch (err) {
        console.error("Gagal menghapus", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Laporan Kerusakan Fasilitas</h1>
      <table className="min-w-full border bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">No</th>
            <th className="p-2 border">Fasilitas Yang Rusak</th>
            <th className="p-2 border">Deksripsi Kerusakan</th>
            <th className="p-2 border">Bukti</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
            {laporan.map((item, index) => (
               <tr key={item.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.fasilitas_yang_rusak}</td>
                  <td className="p-2 border">{item.deskripsi_kerusakan}</td>
                  <td className="p-2 border">
                    {item.berkas ? (
                    <a
                      href={`${import.meta.env.VITE_API_URL}/${item.berkas}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Lihat Bukti
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Tidak ada bukti</span>
                  )}
                </td>
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
