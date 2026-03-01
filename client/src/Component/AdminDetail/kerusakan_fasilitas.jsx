import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const KerusakanFasilitasList = () => {
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/kerusakan_fasilitas`);
      setLaporan(res.data);
    } catch (err) {
      console.error("Gagal memuat data", err);
    }
  };

  const exportToExcel = () => {
    const mappedData = laporan.map((item, index) => ({
      "No": index + 1,
      "Fasilitas Yang Rusak": item.fasilitas_yang_rusak,
      "Deskripsi Kerusakan": item.deskripsi_kerusakan,
      "Bukti (Link)": item.berkas
        ? `${import.meta.env.VITE_API_URL}/uploads/${item.berkas}`
        : "Tidak ada bukti",
    }));

    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Kerusakan Fasilitas");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(fileData, "laporan_kerusakan_fasilitas.xlsx");
  };

  // Filter dan Search
  const filteredLaporan = laporan
    .filter((item) => {
      if (filterBukti === "with") return item.berkas;
      if (filterBukti === "without") return !item.berkas;
      return true;
    })
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.fasilitas_yang_rusak.toLowerCase().includes(query) ||
        item.deskripsi_kerusakan.toLowerCase().includes(query)
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
      <h1 className="text-2xl gotham text-black font-bold mb-4">Laporan Kerusakan Fasilitas</h1>

      {/* Search dan Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari berdasarkan fasilitas atau deskripsi kerusakan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 gotham rounded w-full md:w-1/2"
        />
        <select
          value={filterBukti}
          onChange={(e) => setFilterBukti(e.target.value)}
          className="border p-2 gotham rounded w-full md:w-1/4"
        >
          <option value="all">Semua</option>
          <option value="with">Dengan Bukti</option>
          <option value="without">Tanpa Bukti</option>
        </select>
      </div>

      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden mb-4">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">#</th>
            <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">Fasilitas yang Rusak</th>
            <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider max-w-xs">Deskripsi Kerusakan</th>
            <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">Bukti</th>
            <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentItems.map((item, idx) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-5 py-4 gotham whitespace-nowrap text-sm text-gray-900">
                {indexOfFirstItem + idx + 1}
              </td>
              <td className="px-5 py-4 gotham whitespace-nowrap text-sm text-gray-900">
                {item.fasilitas_yang_rusak}
              </td>
              <td className="px-5 py-4 gotham text-sm text-gray-900 max-w-xs whitespace-normal break-words">
                {item.deskripsi_kerusakan}
              </td>
              <td className="px-5 py-4 gotham text-sm text-gray-900">
                {item.berkas ? (
                  /\.(jpe?g|png|gif)$/i.test(item.berkas) ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${item.berkas}`}
                      alt="Bukti"
                      className="max-w-[150px] gotham max-h-[150px] object-cover rounded"
                    />
                  ) : /\.pdf$/i.test(item.berkas) ? (
                    <iframe
                      src={`${import.meta.env.VITE_API_URL}/uploads/${item.berkas}`}
                      className="w-32 h-32 gotham"
                      title="Bukti PDF"
                    ></iframe>
                  ) : (
                    <a
                      href={`${import.meta.env.VITE_API_URL}/uploads/${item.berkas}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 gotham underline"
                    >
                      Lihat Bukti
                    </a>
                  )
                ) : (
                  <span className="text-gray-400 gotham italic">Tidak ada bukti</span>
                )}
              </td>
              <td className="px-5 py-4 gotham whitespace-nowrap text-sm text-gray-900">
                <a
                  href={`${import.meta.env.VITE_API_URL}/uploads/${item.berkas}`}
                  download
                  className="bg-blue-500 gotham text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Download Bukti
                </a>
              </td>
            </tr>
          ))}

          {currentItems.length === 0 && (
            <tr>
              <td colSpan="5" className="px-5 py-6 text-center gotham text-sm text-gray-500">
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
          className={`px-4 py-2 gotham rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          Sebelumnya
        </button>
        <span className="gotham">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded gotham ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          Selanjutnya
        </button>
      </div>

      {/* Button Download Semua ke Excel */}
      <div className="flex justify-end mt-6">
        <button
          onClick={exportToExcel}
          className="bg-green-500 gotham text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Download Semua ke Excel
        </button>
      </div>
    </div>
  );
};

export default KerusakanFasilitasList;