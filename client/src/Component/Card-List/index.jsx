import React, {useRef,useEffect} from "react";
import icon1 from "../../assets/icon/Icon Laporan Kampus.png";
import icon2 from "../../assets/icon/Icon Tindak Lanjut.png";
import icon3 from "../../assets/icon/Icon Kolaborasi Mahasiswa.png";
import CardAbout from "../Card_About";

const cardlist = [
  {
    image: icon1,
    tittle: "Laporan Kampus",
    text: "Tempat mahasiswa menyampaikan keluhan dan saran seputar kampus dengan mudah",
  },
  {
    image: icon2,
    tittle: "Tindak Lanjut Aduan",
    text: "Setiap laporan yang masuk akan dikaji dan diteruskan ke pihak terkait untuk ditindaklanjuti",
  },
  {
    image: icon3,
    tittle: "Kolaborasi Mahasiswa",
    text: "Bersama-sama wujudkan perubahan dengan aspirasi yang didukung banyak mahasiswa",
  },
];

const CardList = () => {


  return (
    <div className="grid gotham text-lg grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
      {cardlist.map((cert, index) => (
        <div key={index} className={`mt-12 ${index === 1 ? "md:mt-32" : "md:mt-12"}`}>
          <CardAbout image={cert.image} tittle={cert.tittle} text={cert.text} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
