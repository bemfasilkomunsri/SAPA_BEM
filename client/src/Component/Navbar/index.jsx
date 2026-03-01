import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { CiMenuBurger } from "react-icons/ci";
import "./style.css";
import logo from "../../assets/Logo/Logo-BEM.png";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownMobileOpen, setIsDropdownMobileOpen] = useState(false);
  const [animateDropdown, setAnimateDropdown] = useState(false);
  const [animateDropdownMobile, setAnimateDropdownMobile] = useState(false);
  const [hasShadow, setHasShadow] = useState(true);

  const toggleNav = () => {
    setIsMenu(!isMenu);
    setIsDropdownMobileOpen(false);
  };

  const handleToggleDropdown = () => {
    if (isDropdownOpen) {
      setAnimateDropdown(false);
      setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300);
    } else {
      setIsDropdownOpen(true);
      setAnimateDropdown(true);
    }
  };

  const handleToggleDropdownMobile = () => {
    if (isDropdownMobileOpen) {
      setAnimateDropdownMobile(false);
      setTimeout(() => {
        setIsDropdownMobileOpen(false);
      }, 300);
    } else {
      setIsDropdownMobileOpen(true);
      setAnimateDropdownMobile(true);
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown-desktop") && isDropdownOpen) {
      setAnimateDropdown(false);
      setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(false);
      } else {
        setHasShadow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar justify-between flex p-5 px-12 fixed top-0 w-full bg-white z-50 transition-shadow duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center h-20">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="my-6 gotham self-center text-gradient items-center ease-in-out duration-300 cursor-pointer text-sm font-semibold ml-3 lg:inline"
        >
          <div className="flex">
            <img src={logo} className="w-16 md:w-20" />
            <div className="self-center ml-4">
              <h1 className="text-md cinzel md:text-2xl">
                Sentra Aspirasi Pengaduan Asa
              </h1>
              <p className="cinzelbae text-sm md:text-xl">BEM FASILKOM UNSRI</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Normal Navbar */}
      <div className="navbar-nav flex">
        <Link
          to="home"
          smooth
          duration={500}
          className="my-6 gotham self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden"
        >
          Beranda
        </Link>
        <Link
          to="about"
          smooth
          duration={500}
          className="my-6 gotham self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden"
        >
          Tentang Kami
        </Link>
        <Link
          to="laporan"
          smooth
          duration={500}
          className="my-6 gotham self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-6 lg:inline hidden"
        >
          Lapor
        </Link>

        {/* Dropdown Desktop */}
        <div className="relative mx-6 my-6 gotham self-center dropdown-desktop lg:inline hidden">
          <button
            onClick={handleToggleDropdown}
            className="gotham dropdown-btn self-center items-center ease-in-out duration-300 cursor-pointer text-lg font-normal"
          >
            BEM APPS ▾
          </button>

          {isDropdownOpen && (
            <div
              className={`absolute top-full left-0 mt-2 w-44 bg-white rounded shadow-lg z-50 transition-all duration-300 ${animateDropdown ? "animate-fadeIn" : "animate-fadeOut"}`}
            >
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
              {/* <a
                href="https://bemilkomunsri.org/majalah"
                target="_blank"
                rel="noopener noreferrer"
                className="block gotham px-4 py-2 hover:bg-gray-100 text-sm"
              >
                E-MAGAZINE
              </a> */}
            </div>
          )}
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="lg:hidden flex right-0 self-center">
        <p
          onClick={toggleNav}
          className="icons gotham mr-4 right-0 hover-text text-base self-center font-medium cursor-pointer"
        >
          &#9776;
        </p>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-44 bg-white text-black transform ${isMenu ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <div className="right-0 flex flex-col items-center space-y-8 mt-10 min-h-screen bg-white">
          <div className="right-0 close-btn cursor-pointer text-right p-4 text-lg">
            <CiMenuBurger
              onClick={toggleNav}
              className="icon mx-[4.5rem] mt-3 hover-text w-6 h-6 cursor-pointer"
            />
          </div>

          <Link
            to="home"
            smooth
            duration={500}
            className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
            onClick={toggleNav}
          >
            Beranda
          </Link>
          <Link
            to="about"
            smooth
            duration={500}
            className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
            onClick={toggleNav}
          >
            Tentang Kami
          </Link>
          <Link
            to="laporan"
            smooth
            duration={500}
            className="my-6 gotham mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
            onClick={toggleNav}
          >
            Lapor
          </Link>

          {/* Dropdown Mobile */}
          <div className="w-full items-center mt-4 self-center">
            <button
              onClick={handleToggleDropdownMobile}
              className="mb-2 mx-auto gotham hover-text ease-in-out duration-300 cursor-pointer w-full"
            >
              BEM Apps ▾
            </button>
            {isDropdownMobileOpen && (
              <div
                className={`ml-16 mb-2 items-center self-center text-sm space-y-2 transition-all duration-300 ${animateDropdownMobile ? "animate-fadeIn" : "animate-fadeOut"}`}
              >
                <a href="#" className="block gotham hover:text-blue-500">
                  BEM OFFICIAL
                </a>
                <a
                  href="https://ilkomnews.bemilkomunsri.org/"
                  className="block gotham hover:text-blue-500"
                >
                  ILKOM NEWS
                </a>
                <a href="#" className="block gotham hover:text-blue-500">
                  E-MAGAZINE
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
