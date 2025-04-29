import React, { useState } from "react";
import { a } from "react-scroll";
import { CiMenuBurger } from "react-icons/ci";
import "./style.css";
import logo from "../../assets/Logo/Logo-BEM.png";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNav = () => {
    setIsMenu(!isMenu);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar justify-between flex p-5 px-35 fixed top-0 w-full bg-white z-50 transition-shadow duration-300 ">
      {/* Logo */}
      <div className="flex items-center h-20">
        <a
          href="/"
          className="my-6 gotham self-center text-gradient items-center ease-in-out duration-300 cursor-pointer text-sm font-semibold ml-3 lg:inline"
        >
          <div className="flex">
            <img src={logo} className="w-20" />
            <div className="self-center ml-4">
            <h1 className="text-2xl cinzel">Gerakan Aspirasi Online</h1>
              <p className="cinzelbae text-xl">BEM KM FASILKOM UNSRI</p>
            </div>
          </div>
        </a>
      </div>
     {/* Normal Navbar */}
     <div className="navbar-nav flex">
        <a href="/" className="my-6 self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden">
          Beranda
        </a>
        <a href="/" className="my-6 self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden">
          Tentang Kami
        </a>
        <a href="/" className="my-6 self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden">
          Lapor
        </a>

        {/* Dropdown */}
        <div className="relative mx-6 my-6 self-center lg:inline hidden">
          <button
            onClick={toggleDropdown}
            className="text-lg font-normal cursor-pointer hover-text"
          >
            BEM APPS ▾
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded shadow-lg z-50">
              <a
                href="https://bemilkomunsri.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block gotham px-4 py-2 hover:bg-gray-100 text-sm"
              >
                BEM OFFICIAL
              </a>
              <a
                href="https://ilkomnews.bemilkomunsri.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block gotham px-4 py-2 hover:bg-gray-100 text-sm"
              >
                ILKOM NEWS
              </a>
              <a
                href="https://bemilkomunsri.org/majalah"
                target="_blank"
                rel="noopener noreferrer"
                className="block gotham px-4 py-2 hover:bg-gray-100 text-sm"
              >
                E-MAGAZINE
              </a>
            </div>
          )}
        </div>
      </div>


      {/* Hamburger Menu */}
      <div className="lg:hidden flex right-0 self-center">
        <p
          onClick={toggleNav}
          className="icons mr-4 right-0 hover-text text-base self-center font-medium cursor-pointer"
        >
          {" "}
          &#9776;{" "}
        </p>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-44 bg-white text-black transform ${
          isMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="right-0 flex flex-col items-center space-y-8 mt-10 min-h-screen bg-white">
          {/* Close Button */}
          <div
            className="right-0 close-btn cursor-pointer text-right p-4 text-lg"
            onClick={toggleNav}
          >
            <CiMenuBurger
              onClick={toggleNav}
              className="icon mx-[4.5rem] mt-3 hover-text w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Sidebar as */}
          <a
            href="/"
            className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
          >
            Beranda
          </a>
          <a
            href="/"
            className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
          >
            Tentang Kami
          </a>

          <a
            href="/"
            className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
          >
            Lapor
          </a>

          <a
            href="/"
            className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
          >
            BEM Apps
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
