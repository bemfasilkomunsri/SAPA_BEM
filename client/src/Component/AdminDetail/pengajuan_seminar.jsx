import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

const PengajuanSeminarList = () => {
  const [laporan, setLaporan] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);  // State untuk loading
  const itemsPerPage = 5;

  useEffect(() => {
    getLaporan();
  }, []);

  const getLaporan = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/pengajuan_seminar`);
      setLaporan(res.data);
    } catch (err) {
      console.error('Gagal memuat data', err);
      toast.error('Gagal memuat data, coba lagi nanti!');  // Menampilkan toast error
    } finally {
      setLoading(false);  // Selesai loading
    }
  };

  const exportToExcel = () => {
    const mappedData = laporan.map((item, index) => ({
      "No": index + 1,
      "Jurusan": item.Jurusan,
      "Judul Seminar": item.Judul_Seminar,
      "Deskripsi Seminar": item.Deskripsi_Seminar,
    }));

    const worksheet = XLSX.utils.json_to_sheet(mappedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Pengajuan Seminar");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(fileData, "laporan_pengajuan_seminar.xlsx");
  };

  // Search
  const filteredLaporan = laporan.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.Jurusan.toLowerCase().includes(query) ||
      item.Judul_Seminar.toLowerCase().includes(query) ||
      item.Deskripsi_Seminar.toLowerCase().includes(query)
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
      <h1 className="text-2xl font-bold mb-4">Laporan Pengajuan Seminar</h1>

      {/* Search dan Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari berdasarkan jurusan, judul seminar, atau deskripsi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <button
          onClick={exportToExcel}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Download Semua ke Excel
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
        </div>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden mb-4">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Jurusan</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Judul Seminar</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider max-w-xs">Deskripsi Seminar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((item, idx) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {indexOfFirstItem + idx + 1}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.Jurusan}
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.Judul_Seminar}
                </td>
                <td className="px-5 py-4 text-sm text-gray-900 max-w-xs whitespace-normal break-words">
                  {item.Deskripsi_Seminar}
                </td>
              </tr>
            ))}

            {currentItems.length === 0 && (
              <tr>
                <td colSpan="4" className="px-5 py-6 text-center text-sm text-gray-500">
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

      {/* Toast Notification */}
      <ToastContainer />  {/* Tempat untuk toast */}
    </div>
  );
};

export default PengajuanSeminarList;