import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, reset } from '../../features/AuthSlice';

// Komponen navbar
export const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fungsi untuk logout
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/admin");
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-300 pt-4">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo dan Nama Website */}
            <div className="flex items-center transition-all duration-300 ease-in-out">
              <div className="self-center ml-4">
                <h1 className="text-xl cinzel">Admin Gaspol</h1>
                <p className="cinzelbae">BEM KM FASILKOM UNSRI</p>
              </div>
            </div>

            {/* Tombol Logout */}
            <div className="flex items-center">
              <button 
                onClick={logout}
                className="rounded-lg bg-red-500 text-white px-4 py-2 transition-all ease-in-out duration-300 hover:bg-red-600 transform hover:scale-105 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;