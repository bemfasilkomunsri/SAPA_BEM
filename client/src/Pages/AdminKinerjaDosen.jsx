import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../features/AuthSlice";
import AdminDetail from "../Component/AdminDetail/kinerja_dosen";
import AdminNavbar from "../Component/AdminNavbar";


const AdminKinerjaDosen = () => {
  // Dispatch dan Navigate dari React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state) => state.auth);
  
  // Cek user login
  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch]);
  
  // Kalo user tidak login, redirect ke page login
  useEffect(()=>{
    if(isError){
        navigate("/admin");
    }
  }, [isError, navigate]);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full ">
        <AdminNavbar/>
        <AdminDetail />
      </div>
    </main>
  );
};

export default AdminKinerjaDosen