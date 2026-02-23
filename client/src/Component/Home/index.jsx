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
      { threshold: 0.3 }, // Elemen terlihat jika 30% masuk ke viewport
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
      <section className="lg:pt-32 pt-72 home flex items-center justify-center min-h-screen">
        <div className="lg:flex justify-center self-center">
          <div ref={titleRef} className="lg:ml-20 fade-up mx-10 self-center">
            <h1 className="text gotham lg:text-6xl text-4xl font-bold">
              Sampaikan Aspirasi
            </h1>
            <h1 className="text gotham mt-2 lg:text-6xl text-4xl font-bold">
              Bersama <span className="gaspol">SAPA</span>
            </h1>
            <p className=" gotham max-w-[40rem] md:text-lg text-md mt-10">
              Suatu wadah aspirasi bagi mahasiswa Fasilkom untuk bersuara
              terkait saran maupun keluh kesah yang dihadapi selama menimba ilmu
              di Fasilkom, dengan tahap awal yang akan lebih terjun ke seluruh
              bagian dari mahasiswa Fasilkom dan akan dikolektifkan menjadi
              berbagai data yang valid untuk dibahas bersama pimpinan Fasilkom
                        
            </p>
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="gotham inline-block mt-10 rounded-lg  cursor-pointer  border-angular duration-300 ease-in-out  px-10 py-3 text-lg font-medium text-white hover:bg-transparent hover:text-black"
            >
              Baca Selengkapnya!
            </Link>{" "}
          </div>
          <div
            ref={gambarRef}
            className="self-center lg:ml-36 fade-up lg:mt-0 mt-12 mx-auto"
          >
            <img src={logo} className="w-110 mx-auto" />
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Home;
