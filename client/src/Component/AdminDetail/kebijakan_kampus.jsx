import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const KebijakanKampusList = () => {
  const [laporan, setLaporan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBukti, setFilterBukti] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    getLaporan();
  }, []);

  const getLaporan = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/kebijakan_kampus`);
      setLaporan(res.data);
    } catch (err) {
      console.error("Gagal memuat data", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus laporan ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/kebijakan_kampus/${id}`);
        getLaporan(); // Refresh data
      } catch (err) {
        console.error("Gagal menghapus", err);
      }
    }
  };

  const exportToExcel = () => {
    const mappedData = laporan.map((item, index) => ({
      "No": index + 1,
      "Judul Aspirasi": item.judul_aspirasi,
      "Nama Kebijakan": item.nama_kebijakan,
      "Isi Aspirasi": item.isi_aspirasi,
      "Bukti (Link)": item.data_pendukung
        ? `${import.meta.env.VITE_API_URL}/uploads/${item.data_pendukung}`
        : "Tidak ada bukti",
    }));

    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Kebijakan Kampus");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(fileData, "laporan_kebijakan_kampus.xlsx");
  };

  // Filter dan Search
  const filteredLaporan = laporan
    .filter((item) => {
      if (filterBukti === "with") return item.data_pendukung;
      if (filterBukti === "without") return !item.data_pendukung;
      return true;
    })
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.judul_aspirasi.toLowerCase().includes(query) ||
        item.nama_kebijakan.toLowerCase().includes(query) ||
        item.isi_aspirasi.toLowerCase().includes(query)
      );
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLaporan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLaporan.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 pt-28">
      <h1 className="text-2xl font-bold mb-4">Laporan Kebijakan Kampus</h1>

      {/* Search dan Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari berdasarkan judul, nama kebijakan, isi aspirasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={filterBukti}
          onChange={(e) => setFilterBukti(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="all">Semua</option>
          <option value="with">Dengan Bukti</option>
          <option value="without">Tanpa Bukti</option>
        </select>
      </div>

      <table className="min-w-full border bg-white shadow rounded mb-4">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Judul Aspirasi</th>
            <th className="p-2 border">Nama Kebijakan</th>
            <th className="p-2 border">Isi Aspirasi</th>
            <th className="p-2 border">Bukti</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td className="p-2 border">{indexOfFirstItem + index + 1}</td>
              <td className="p-2 border">{item.judul_aspirasi}</td>
              <td className="p-2 border">{item.nama_kebijakan}</td>
              <td className="p-2 border">{item.isi_aspirasi}</td>
              <td className="p-2 border">
                {item.data_pendukung ? (
                  item.data_pendukung.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${item.data_pendukung}`}
                      alt="Bukti"
                      className="max-w-[150px] max-h-[150px] object-cover rounded"
                    />
                  ) : item.data_pendukung.match(/\.pdf$/i) ? (
                    <iframe
                      src={`${import.meta.env.VITE_API_URL}/uploads/${item.data_pendukung}`}
                      className="w-32 h-32"
                      title="Bukti PDF"
                    ></iframe>
                  ) : (
                    <a
                      href={`${import.meta.env.VITE_API_URL}/uploads/${item.data_pendukung}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Lihat Bukti
                    </a>
                  )
                ) : (
                  <span className="text-gray-400 italic">Tidak ada bukti</span>
                )}
              </td>

              <td className="p-2 border flex gap-2">
                {item.data_pendukung && (
                  <a
                    href={`${import.meta.env.VITE_API_URL}/uploads/${item.data_pendukung}`}
                    download
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Download Bukti
                  </a>
                )}
              </td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Tidak ada laporan ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Sebelumnya
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Selanjutnya
        </button>
      </div>

      {/* Button Download Semua ke Excel */}
      <div className="flex justify-end mt-6">
        <button
          onClick={exportToExcel}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Download Semua ke Excel
        </button>
      </div>
    </div>
  );
};

export default KebijakanKampusList;