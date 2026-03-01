// AdminKebijakanKampus.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/AuthSlice";
import AdminDetail from "../Component/AdminDashboard";
import AdminNavbar from "../Component/AdminNavbar";
import AdminSidebar from '../Component/AdminSideBar';

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  
  // Cek user login
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  // Redirect jika belum login
  useEffect(() => {
    if (isError) {
      navigate("/admin");
    }
  }, [isError, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-100">
        <div className="flex-shrink-0">
          <AdminSidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <AdminNavbar />
        <main className="overflow-auto">
          <AdminDetail />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;