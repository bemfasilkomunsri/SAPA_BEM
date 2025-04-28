import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LaporanPengajuanSeminarPage from "./Pages/LaporanPengajuanSeminarPage";
import LaporanKinerjaDosenPage from "./Pages/LaporanKinerjaDosenPage";
import LaporanKerusakanFasilitasPage from "./Pages/LaporanKerusakanFasilitasPage";
import LaporanKebijakanKampusPage from "./Pages/LaporanKebijakanKampusPage";
import AdminPage from "./Pages/AdminPage";
import LaporanPage from "./Pages/LaporanPage";
import LaporanOrmawaPage from "./Pages/LaporanOrmawaPage";
import AdminKinerjaDosen from "./Pages/AdminKinerjaDosen";
import AdminKebijakanKampus from "./Pages/AdminKebijakanKampus";
import AdminOrmawa from "./Pages/AdminOrmawa";
import AdminKerusakanFasilitas from "./Pages/AdminKerusakanFasilitas";
import AdminPengajuanSeminar from "./Pages/AdminPengajuanSeminar"
import Login from "../src/Component/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laporan-pengajuan-seminar" element={<LaporanPengajuanSeminarPage />} />
        <Route path="/laporan-kinerja-dosen" element={<LaporanKinerjaDosenPage />} />
        <Route path="/laporan-kerusakan-fasilitas" element={<LaporanKerusakanFasilitasPage />} />
        <Route path="/laporan-kebijakan-kampus" element={<LaporanKebijakanKampusPage />} />
        <Route path="/laporan-ormawa" element={<LaporanOrmawaPage />} />
        <Route path="/laporan" element={<LaporanPage />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/admin/kinerja-dosen" element={<AdminKinerjaDosen />} />
        <Route path="/admin/kebijakan-kampus" element={<AdminKebijakanKampus />} />
        <Route path="/admin/kerusakan-fasilitas" element={<AdminKerusakanFasilitas />} />
        <Route path="/admin/ormawa" element={<AdminOrmawa />} />
        <Route path="/admin/pengajuan-seminar" element={<AdminPengajuanSeminar />} />
      </Routes>
    </Router>
  );
};

export default App;