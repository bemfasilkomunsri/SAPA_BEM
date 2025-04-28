import React, {useEffect,useRef} from "react";
import "./style.css";

const CardAbout = ({image,tittle,text}) => {

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
    if (gambarRef.current) observer.observe(gambarRef.current);

    // Cleanup observer saat unmount
    return () => {
      if (gambarRef.current) observer.unobserve(gambarRef.current);
    };
  }, []);

  return (
    <div ref={gambarRef} className="fade-up flex flex-col items-center justify-center">
      <img src={image} className="mb-2 w-42" />
      <p className="text-black gotham text-lg font-medium">{tittle}</p>
      <p className="text-center max-w-[16rem] mt-3 text-md">
        {text}
      </p>
    </div>
  );
};

export default CardAbout;