import { useState, useEffect } from "react";
import "./style.css";

function LaporanKebijakanKampus() {
  const [laporan, setLaporan] = useState([]);
  const [formData, setFormData] = useState({
    judul_aspirasi: "",
    nama_kebijakan: "",
    isi_aspirasi: "",
    proses: 0,
  });
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/kebijakan_kampus`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLaporan(data))
      .catch((err) => console.error(err));
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "proses" ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 3 * 1024 * 1024) { // 3MB
      setErrorMessage("Ukuran file maksimal 3MB.");
      setFile(null);
    } else {
      setErrorMessage("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (file && file.size > 3 * 1024 * 1024) {
      setErrorMessage("Ukuran file melebihi 3MB. Silakan pilih file lain.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("judul_aspirasi", formData.judul_aspirasi);
    submissionData.append("nama_kebijakan", formData.nama_kebijakan);
    submissionData.append("isi_aspirasi", formData.isi_aspirasi);
    submissionData.append("proses", formData.proses);
    if (file) submissionData.append("dataPendukung", file);

    fetch(`${API_URL}/kebijakan_kampus`, {
      method: "POST",
      credentials: "include",
      body: submissionData,
    })
      .then((res) => res.json())
      .then((response) => {
        setSuccessMessage(response.message);
        setFormData({
          judul_aspirasi: "",
          nama_kebijakan: "",
          isi_aspirasi: "",
          proses: 0,
        });
        setFile(null);
        return fetch(`${API_URL}/kebijakan_kampus`);
      })
      .then((res) => res.json())
      .then((data) => setLaporan(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  return (
    <div
      style={{ padding: "100px 20px", textAlign: "center" }}
      className="min-h-screen bg-[url('/src/assets/Background/DetailForm.svg')] bg-cover bg-center bg-no-repeat"
    >
      <h1 style={{ fontSize: "32px", fontWeight: "600", fontFamily: "Gotham, sans-serif", color: "#000000", marginBottom: "16px" }}>
        Pelaporan Kebijakan Kampus
      </h1>
      <p style={{ maxWidth: "600px", margin: "0 auto 40px", color: "#3E3E3E", fontFamily: "Gotham, sans-serif" }}>
        Sampaikan aspirasi atau masukan terhadap kebijakan kampus. Upload data pendukung jika ada, agar aspirasi lebih kuat dan dapat ditindaklanjuti.
      </p>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
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
          { label: "Judul Aspirasi", name: "judul_aspirasi", type: "text" },
          { label: "Nama Kebijakan", name: "nama_kebijakan", type: "text" },
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
          <label style={{ fontWeight: "500" }}>Isi Aspirasi</label>
          <textarea
            name="isi_aspirasi"
            value={formData.isi_aspirasi}
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

        <div style={{ display: "none" }}>
          <label>Proses</label>
          <select
            name="proses"
            value={formData.proses}
            onChange={handleChange}
          >
            <option value={0}>Pending</option>
            <option value={1}>Diproses</option>
            <option value={2}>Selesai</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500" }}>Upload Data Pendukung</label>
          <input
            type="file"
            name="dataPendukung"
            onChange={handleFileChange}
            style={{ marginTop: "8px" }}
          />
        </div>

        <button className="custom-button gotham" type="submit">
          Kirim Aspirasi
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

export default LaporanKebijakanKampus;