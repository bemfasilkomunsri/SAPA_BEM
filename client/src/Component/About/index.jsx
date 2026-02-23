import React, { useEffect, useRef } from "react";
import "./style.css";
import CardList from "../Card-List";
import { Element, Link } from "react-scroll";
const About = () => {
  const titleRef = useRef(null);
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);

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
    if (title2Ref.current) observer.observe(title2Ref.current);
    if (title3Ref.current) observer.observe(title3Ref.current);

    // Cleanup observer saat unmount
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (title2Ref.current) observer.unobserve(title2Ref.current);
      if (title3Ref.current) observer.unobserve(title3Ref.current);
    };
  }, []);

  return (
    <Element name="about">
      <section className="pt-30 about">
        <div></div>
        <div ref={title2Ref} className="lg:mt-20 fade-up mt-8">
          <h1 className="text-center gotham text lg:text-5xl mb-12 z-10 text-4xl font-bold">
            Dari Mahasiswa Untuk Kampus
          </h1>
        </div>

        <div>
          <p
            ref={title3Ref}
            className="fade-up gotham md:mx-auto mx-4 text-center text-angular lg:text-xl text-lg max-w-[43rem] lg:mt-6 mt-30 font-normal"
          >
            SAPA merupakan hasil kolaborasi dari Departemen Riset PTI dan
            Departemen Kastrad BEM Fasilkom Kabinet Arka Satyawira. SAPA
            berfungsi sebagai wadah aspirasi bagi mahasiswa Fasilkom untuk
            menyampaikan saran maupun keluh kesah yang dihadapi selama menimba
            ilmu di Fakultas Ilmu Komputer Universitas Sriwijaya.
          </p>
        </div>
        <div className="mt-12">
          <CardList />
        </div>
      </section>
    </Element>
  );
};

export default About;
