import { useState, useEffect } from "react";
import "./style.css";

function LaporanKerusakanFasilitas() {
  const [laporan, setLaporan] = useState([]);
  const [formData, setFormData] = useState({
    fasilitas_yang_rusak: "",
    deskripsi_kerusakan: "",
    proses: 0,
  });
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/kerusakan_fasilitas`)
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
    submissionData.append("fasilitas_yang_rusak", formData.fasilitas_yang_rusak);
    submissionData.append("deskripsi_kerusakan", formData.deskripsi_kerusakan);
    submissionData.append("proses", formData.proses);
    if (file) submissionData.append("berkas", file);

    fetch(`${API_URL}/kerusakan_fasilitas`, {
      method: "POST",
      body: submissionData,
    })
      .then((res) => res.json())
      .then((response) => {
        setSuccessMessage(response.message);
        setFormData({
          fasilitas_yang_rusak: "",
          deskripsi_kerusakan: "",
          proses: 0,
        });
        setFile(null);
        return fetch(`${API_URL}/kerusakan_fasilitas`);
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
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "600" }}>
        Laporan Kerusakan Fasilitas
      </h1>
      <p style={{ maxWidth: "600px", margin: "0 auto 40px", color: "#555" }}>
        Laporkan segala bentuk kerusakan fasilitas yang Anda temui di lingkungan kampus. 
        Sertakan bukti agar laporan dapat segera ditindaklanjuti.
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
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500" }}>Fasilitas yang Rusak</label>
          <input
            type="text"
            name="fasilitas_yang_rusak"
            value={formData.fasilitas_yang_rusak}
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

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "500" }}>Deskripsi Kerusakan</label>
          <textarea
            name="deskripsi_kerusakan"
            value={formData.deskripsi_kerusakan}
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
          <label style={{ fontWeight: "500" }}>Upload Bukti Kerusakan</label>
          <input
            type="file"
            name="berkas"
            onChange={handleFileChange}
            style={{ marginTop: "8px" }}
          />
        </div>

        <button className="custom-button" type="submit">
          Kirim Laporan
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

export default LaporanKerusakanFasilitas;