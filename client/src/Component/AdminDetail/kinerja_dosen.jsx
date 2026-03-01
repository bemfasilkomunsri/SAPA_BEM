import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";  // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const KinerjaDosenList = () => {
  const [laporan, setLaporan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);  // State untuk loading
  const itemsPerPage = 5;

  useEffect(() => {
    getLaporan();
  }, []);

  const getLaporan = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/kinerja_dosen`);
      setLaporan(res.data);
    } catch (err) {
      console.error("Gagal memuat data", err);
      toast.error("Gagal memuat data, coba lagi nanti!");  // Menampilkan toast error
    } finally {
      setLoading(false);  // Selesai loading
    }
  };

  const exportToExcel = () => {
    const mappedData = laporan.map((item, index) => ({
      "No": index + 1,
      "Subjek Aspirasi": item.Subjek_Aspirasi,
      "Target Aspirasi": item.Target_Aspirasi,
      "Jurusan Dosen": item.Jurusan_Dosen,
      "Matakuliah Dosen": item.Matakuliah_Dosen,
      "Isi Aspirasi": item.Isi_Aspirasi,
    }));

    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Kinerja Dosen");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(fileData, "laporan_kinerja_dosen.xlsx");
  };

  // Search
  const filteredLaporan = laporan.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.Subjek_Aspirasi.toLowerCase().includes(query) ||
      item.Target_Aspirasi.toLowerCase().includes(query) ||
      item.Jurusan_Dosen.toLowerCase().includes(query) ||
      item.Matakuliah_Dosen.toLowerCase().includes(query) ||
      item.Isi_Aspirasi.toLowerCase().includes(query)
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
      <h1 className="text-2xl gotham text-black font-bold mb-4">Laporan Kinerja Dosen</h1>

      {/* Search dan Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari berdasarkan subjek, target, jurusan dosen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 gotham rounded w-full md:w-1/2"
        />
        <button
          onClick={exportToExcel}
          className="bg-green-500 gotham hover:bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Download Semua ke Excel
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin border-t-4 border-blue-500 gotham rounded-full w-16 h-16"></div>
        </div>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">Subjek Aspirasi</th>
              <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">Target Aspirasi</th>
              <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">Jurusan Dosen</th>
              <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider">Matakuliah Dosen</th>
              <th className="px-5 py-3 text-left text-xs font-semibold gotham text-gray-700 uppercase tracking-wider max-w-xs">Isi Aspirasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((item, idx) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-4 gotham whitespace-nowrap text-sm text-gray-900">
                  {indexOfFirstItem + idx + 1}
                </td>
                <td className="px-5 py-4 gotham whitespace-nowrap text-sm text-gray-900">
                  {item.Subjek_Aspirasi}
                </td>
                <td className="px-5 py-4 gotham whitespace-nowrap text-sm text-gray-900">
                  {item.Target_Aspirasi}
                </td>
                <td className="px-5 py-4 gotham whitespace-nowrap text-sm text-gray-900">
                  {item.Jurusan_Dosen}
                </td>
                <td className="px-5 py-4 gotham whitespace-nowrap text-sm text-gray-900">
                  {item.Matakuliah_Dosen}
                </td>
                <td className="px-5 py-4 gotham text-sm text-gray-900 max-w-xs whitespace-normal break-words">
                  {item.Isi_Aspirasi}
                </td>
              </tr>
            ))}

            {currentItems.length === 0 && (
              <tr>
                <td colSpan="6" className="px-5 py-6 gotham text-center text-sm text-gray-500">
                  Tidak ada laporan ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 gotham rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Sebelumnya
        </button>
        <span className="gotham">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 gotham rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Selanjutnya
        </button>
      </div>

      {/* Toast Notification */}
      <ToastContainer />  {/* Tempat untuk toast */}
    </div>
  );
};

export default KinerjaDosenList;