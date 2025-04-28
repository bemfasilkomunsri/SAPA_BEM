import React, { useState } from "react";
import { Link } from "react-scroll";
import { CiMenuBurger } from "react-icons/ci";
import "./style.css";
import logo from "../../assets/Logo/Logo-BEM.png";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMobileOpen, setIsDropdownMobileOpen] = useState(false);

  const toggleNav = () => {
    setIsMenu(!isMenu);
    setIsDropdownMobileOpen(false); // Reset mobile dropdown saat toggle
  };

  return (
    <nav className="navbar justify-between flex p-3 top-0 fixed w-full">
      {/* Logo */}
      <div>
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="my-6 gotham self-center text-gradient items-center ease-in-out duration-300 cursor-pointer text-sm font-semibold ml-3 lg:inline"
        >
          <div className="flex">
            <img src={logo} className="w-20" />
            <div className="self-center ml-4">
              <h1 className="text-xl cinzel">Artha Darma</h1>
              <p className="cinzelbae">BEM KM FASILKOM UNSRI</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Normal Navbar */}
      <div className="navbar-nav flex">
        <Link to="home" smooth duration={500} className="my-6 gotham self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-12 lg:inline hidden">
          Beranda
        </Link>
        <Link to="about" smooth duration={500} className="my-6 gotham self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-12 lg:inline hidden">
          Tentang Kami
        </Link>
        <Link to="laporan" smooth duration={500} className="my-6 gotham self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-12 lg:inline hidden">
          Lapor
        </Link>

        {/* Dropdown Desktop */}
        <div className="relative mx-12 my-6 gotham self-center lg:inline hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="gotham BEM-APPS self-center text items-center ease-in-out duration-300 cursor-pointer text-lg font-normal"
          >
            BEM APPS
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded shadow-lg z-50">
              <a href="#" className="block gotham px-4 py-2 hover:bg-gray-100 text-sm">BEM OFFICIAL</a>
              <a href="#" className="block gotham px-4 py-2 hover:bg-gray-100 text-sm">ILKOM NEWS</a>
              <a href="#" className="block gotham px-4 py-2 hover:bg-gray-100 text-sm">E-MAGAZINE</a>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="lg:hidden flex right-0 self-center">
        <p onClick={toggleNav} className="icons gotham mr-4 right-0 hover-text text-base self-center font-medium cursor-pointer">
          &#9776;
        </p>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-44 bg-white text-black transform ${isMenu ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg z-50`}>
        <div className="right-0 flex flex-col items-center space-y-8 mt-10 min-h-screen bg-white">
          {/* Close Button */}
          <div className="right-0 close-btn cursor-pointer text-right p-4 text-lg">
            <CiMenuBurger onClick={toggleNav} className="icon mx-[4.5rem] mt-3 hover-text w-6 h-6 cursor-pointer" />
          </div>

          {/* Sidebar Links */}
          <Link to="home" smooth duration={500} className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer" onClick={toggleNav}>
            Beranda
          </Link>
          <Link to="about" smooth duration={500} className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer" onClick={toggleNav}>
            Tentang Kami
          </Link>
          <Link to="laporan" smooth duration={500} className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer" onClick={toggleNav}>
            Lapor
          </Link>

          {/* Dropdown Mobile */}
          <div className="w-full items-center mt-4 self-center">
            <button
              onClick={() => setIsDropdownMobileOpen(!isDropdownMobileOpen)}
              className="mb-2 mx-auto gotham hover-text ease-in-out duration-300 cursor-pointer w-full "
            >
              BEM Apps ▾
            </button>
            {isDropdownMobileOpen && (
              <div className="ml-16 mb-2  items-center self-center text-sm space-y-2">
                <a href="#" className="block gotham hover:text-blue-500">BEM OFFICIAL</a>
                <a href="#" className="block gotham hover:text-blue-500">ILKOM NEWS</a>
                <a href="#" className="block gotham hover:text-blue-500">E-MAGAZINE</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
