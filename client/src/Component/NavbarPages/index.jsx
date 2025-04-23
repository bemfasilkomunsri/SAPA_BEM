import React, { useState } from "react";
import { a } from "react-scroll";
import { CiMenuBurger } from "react-icons/ci";
import "./style.css";
import logo from "../../assets/Logo/Logo-BEM.png";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);

  const toggleNav = () => {
    setIsMenu(!isMenu);
  };
  return (
    <nav className="navbar justify-between flex p-3 top-0 fixed w-full ">
      {/* Logo */}
      <div>
        <a
          href="/"
          className="my-6 self-center text-gradient items-center ease-in-out duration-300 cursor-pointer text-sm font-semibold ml-3 lg:inline"
        >
          <div className="flex">
            <img src={logo} className="w-20" />
            <div className="self-center ml-4">
              <h1 className="text-xl decorativeBold">Arta Darma</h1>
              <p>BEM KM FASILKOM UNSRI</p>
            </div>
          </div>
        </a>
      </div>
      {/* Normal Navbar */}
      <div className="navbar-nav flex">
        <a
          href="/"
          className="my-6 self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-12 lg:inline hidden"
        >
          Beranda
        </a>
        <a
          href="/"
          className="my-6 self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-12 lg:inline hidden"
        >
          Tentang Kami
        </a>

        <a
          href="/"
          className="my-6 self-center items-center hover-text ease-in-out duration-300 cursor-pointer text-base font-normal mx-12 lg:inline hidden"
        >
          Lapor
        </a>

        <a
          href="/"
          className="my-6 self-center text items-center ease-in-out duration-300 cursor-pointer text-lg font-medium mx-12 lg:inline hidden"
        >
          BEM Apps
        </a>
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
            className="my-6 mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
          >
            Beranda
          </a>
          <a
            href="/"
            className="my-6 mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
          >
            Tentang Kami
          </a>

          <a
            href="/"
            className="my-6 mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
          >
            Lapor
          </a>

          <a
            href="/"
            className="my-6 mx-auto self-center items-center hover-text ease-in-out duration-300 cursor-pointer"
          >
            BEM Apps
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
