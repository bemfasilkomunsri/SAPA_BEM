import React from "react";
import logo from "../../assets/Logo/Logo-BEM.png";
import styles from "./components.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="Logo" className={styles.footerLogoImage} />
            <div className={styles.footerLogoText}>
              <span className={styles.decorativeBold}>A</span>
              <span className={styles.regular}>Rka</span>{" "}
              <span className={styles.regular}>Satyawir</span>
              <span className={styles.decorativeBold}>A</span>
              <br />
              BEM KM FASILKOM UNSRI
            </div>
          </div>

          <p>
            Gedung Fakultas Ilmu Komputer
            <br />
            Kampus Universitas Sriwijaya
            <br />
            Indralaya KM 33
          </p>
        </div>
        <div className={styles.footerContact}>
          <h3>Contact Us</h3>
          <div className="flex-col flex">
            <a
              href="https://www.linkedin.com/company/bemkmfasilkomunsri/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin: @bemkmilkomunsri
            </a>
            <a href="">Email: bemfasilkomunsri@gmail.com</a>
            <a
              href="https://www.instagram.com/bemilkomunsri"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram: @bemilkomunsri
            </a>
            <a
              href="https://x.com/bemilkomunsri"
              target="_blank"
              rel="noopener noreferrer"
            >
              X: @bemilkomunsri
            </a>
            <a
              href="https://www.facebook.com/bemilkomunsri?_rdc=2&_rdr#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook: bemilkomunsri
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.footerCredit}>
          Website developed by Departemen Riset & PTI — Kabinet Arka Satyawira
        </p>
        <p>&copy; BEM FASILKOM UNSRI 2026 | Kabinet Arka Satyawira</p>
      </div>
    </footer>
  );
};

export default Footer;
