import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <main className="nf-container">
      
      {/* animated background circles */}
      <div className="nf-animated-bg">
        <div className="nf-circle"></div>
        <div className="nf-circle"></div>
        <div className="nf-circle"></div>
        <div className="nf-circle"></div>
        <div className="nf-circle"></div>
      </div>

      {/* content */}
      <div className="nf-content">

        <h1 className="nf-title">404</h1>

        <p className="nf-subtitle">
          Halaman yang kamu cari tidak ditemukan
        </p>

        <Link to="/" className="nf-btn">
          Kembali ke Home
        </Link>

      </div>

    </main>
  );
};

export default NotFoundPage;
