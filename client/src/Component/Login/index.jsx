import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../../features/AuthSlice';  // Pastikan ada aksi LoginUser yang sesuai
import logo from '../../assets/Logo/Logo-BEM.png';

export const Login = () => {
  const [username, setUsername] = useState("");  // Ganti email dengan username
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  // Cek apakah user sudah login atau berhasil login
  useEffect(() => {
    if (user || isSuccess) {
      navigate('/admin/dashboard');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  // Fungsi untuk form submit
  const Auth = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat submit form
    if (!username || !password) { // Validasi apakah input username dan password sudah diisi
      alert("Please fill all fields");
      return;
    }
    dispatch(LoginUser({ username, password })); // Kirim request login ke Redux store
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="p-5">
          <img 
            src={logo} 
            alt="" 
            className="w-30 h-30 mx-auto"
          />
        </div>
        <form onSubmit={Auth} className="bg-white rounded-lg shadow-xl p-7 transform transition-all">
          <div className="text-center p-7">
            <h2 className="text-2xl gotham text-red-950 font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500 gotham">Enter your username & password to login</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 gotham text-sm font-bold mb-2">Username</label>
            <input 
              type="text" // Mengganti type menjadi text untuk username
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-gray-900 gotham px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Username"
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm gotham font-bold mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-900 gotham px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Password"
            />
          </div>
          <div className="mb-8">
            {isError && <p className="p-4 mb-4 text-sm text-red-700 gotham bg-red-100 rounded-md">{message}</p>}
          </div>
          <button 
            type="submit"
            className="w-full text-white gotham font-bold bg-red-900! hover:bg-red-950! py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;