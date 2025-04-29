import { useState, useEffect } from "react";
import "./style.css";

function LaporanPengajuanSeminar() {
  const [laporan, setLaporan] = useState([]);
  const [formData, setFormData] = useState({
    Jurusan: "",
    Judul_Seminar: "",
    Deskripsi_Seminar: "",
    proses: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/pengajuan_seminar`)
      .then((res) => res.json())
      .then((data) => setLaporan(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "proses" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input jika perlu
    if (!formData.Judul_Seminar || !formData.Deskripsi_Seminar) {
      setErrorMessage("Judul Seminar dan Deskripsi wajib diisi.");
      return;
    }

    // Kirim data pengajuan seminar ke API
    fetch(`${API_URL}/pengajuan_seminar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // langsung kirim sebagai JSON
    })
      .then((res) => res.json())
      .then((response) => {
        setSuccessMessage(response.message);
        setFormData({
          Jurusan: "",
          Judul_Seminar: "",
          Deskripsi_Seminar: "",
          proses: 0,
        });

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);

        return fetch(`${API_URL}/pengajuan_seminar`);
      })
      .then((res) => res.json())
      .then((data) => setLaporan(data))
      .catch((err) => console.error(err));
  };

  return (
    <div
      style={{ padding: "40px 20px", textAlign: "center" }}
      className="min-h-screen bg-[url('/src/assets/Background/DetailForm.svg')] bg-cover bg-center bg-no-repeat"
    >
      <h1 style={{ fontSize: "32px", fontWeight: "600", fontFamily: "Gotham, sans-serif", color: "#000000", marginBottom: "16px" }}>
        Pengajuan Seminar
      </h1>
      <p style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto 40px", color: "#3E3E3E", fontFamily: "Gotham, sans-serif" }}>
        Silakan isi form berikut untuk mengajukan seminar. Pastikan informasi
        yang Anda berikan akurat dan lengkap.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "30px",
          borderRadius: "6px",
          textAlign: "left",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
          backgroundColor: "#fff", 
          fontFamily: "Gotham, sans-serif"
        }}
      >
        {[ 
          { label: "Jurusan", name: "Jurusan", type: "text" },
          { label: "Judul Seminar", name: "Judul_Seminar", type: "text" }
        ].map(({ label, name, type }) => (
          <div key={name} style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "500" }}>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid #000",
                padding: "8px 4px",
                outline: "none",
                fontSize: "14px",
                background: "transparent",
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500" }}>Deskripsi Seminar</label>
          <textarea
            name="Deskripsi_Seminar"
            value={formData.Deskripsi_Seminar}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #000",
              padding: "8px 4px",
              fontSize: "14px",
              background: "transparent",
              resize: "vertical",
              minHeight: "80px",
              outline: "none",
            }}
          ></textarea>
        </div>
        
        <button className="custom-button gotham" type="submit">
          Kirim Pengajuan
        </button>

        {errorMessage && (
          <div className="alert error">
              {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="alert success">
              {successMessage}
          </div>
        )}
      </form>
    </div>
  );
}  

export default LaporanPengajuanSeminar;