import React, { useEffect, useRef } from "react";
import "./style.css";
import { Link, Element } from "react-scroll";
import logo from "../../assets/Logo/Logo-BEM.png";

const Home = () => {
  const titleRef = useRef(null);
  const gambarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-animate");
          } else {
            entry.target.classList.remove("fade-up-animate");
          }
        });
      },
      { threshold: 0.3 } // Elemen terlihat jika 30% masuk ke viewport
    );

    // Observasi elemen teks dan gambar
    if (titleRef.current) observer.observe(titleRef.current);
    if (gambarRef.current) observer.observe(gambarRef.current);

    // Cleanup observer saat unmount
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (gambarRef.current) observer.unobserve(gambarRef.current);
    };
  }, []);

  return (
    <Element name="home">
      <section className="lg:pt-32 pt-72  home flex items-center justify-center min-h-screen">
        <div className="lg:flex justify-center self-center">
          <div ref={titleRef} className="lg:ml-20 fade-up mx-6 self-center">
            <h1 className="text lg:text-5xl text-4xl font-medium">
              Sampaikan Pelaporanmu
            </h1>
            <h1 className="text mt-2 lg:text-5xl text-4xl font-medium">
              Bersama <span className="gaspol">GASPOL</span>
            </h1>
            <p className="max-w-[36rem] md:text-base text-sm mt-8">
              Jangan biarkan keluhan dan aspirasi Anda hanya menjadi suara tanpa
              arah laporkan melalui GASPOL, sebuah forum resmi yang memastikan
              setiap masukan didengar dan ditindaklanjuti demi terciptanya
              lingkungan yang lebih baik bagi Fasilkom UNSRI.
            </p>
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="inline-block mt-4 rounded-sm  cursor-pointer  border-angular duration-300 ease-in-out  px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black"
            >
              Baca Selengkapnya!
            </Link>{" "}
          </div>
          <div
            ref={gambarRef}
            className="self-center lg:ml-36 fade-up lg:mt-0 mt-12 mx-auto"
          >
            <img src={logo} className="w-96 mx-auto" />
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Home;
