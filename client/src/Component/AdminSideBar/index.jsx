// src/Component/AdminSideBar/index.jsx
import React, { useState } from 'react';
import { Sidebar, SidebarItem } from '../Sidebar'; 
import { Home, ClipboardList, Hammer, FileText, Users, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  return (
    <Sidebar expanded={expanded} setExpanded={setExpanded}>
      <SidebarItem 
        icon={<Home size={20} />} 
        text="Dashboard" 
        to="/admin/dashboard" 
        active={location.pathname === '/admin/dashboard'} 
      />
      <SidebarItem 
        icon={<ClipboardList size={20} />} 
        text="Kinerja Dosen" 
        to="/admin/kinerja-dosen" 
        active={location.pathname === '/admin/kinerja-dosen'} 
      />
      <SidebarItem 
        icon={<Hammer size={20} />} 
        text="Kerusakan Fasilitas" 
        to="/admin/kerusakan-fasilitas" 
        active={location.pathname === '/admin/kerusakan-fasilitas'} 
      />
      <SidebarItem 
        icon={<FileText size={20} />} 
        text="Kebijakan Kampus" 
        to="/admin/kebijakan-kampus" 
        active={location.pathname === '/admin/kebijakan-kampus'} 
      />
      <SidebarItem 
        icon={<Users size={20} />} 
        text="Ormawa" 
        to="/admin/ormawa" 
        active={location.pathname === '/admin/ormawa'} 
      />
      <SidebarItem 
        icon={<Calendar size={20} />} 
        text="Pengajuan Seminar" 
        to="/admin/pengajuan-seminar" 
        active={location.pathname === '/admin/pengajuan-seminar'} 
      />
    </Sidebar>
  );
};

export default AdminSidebar;