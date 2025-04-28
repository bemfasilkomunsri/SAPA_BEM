import { useState } from "react";
import "./style.css";

function LaporanKinerjaDosen() {
  const [formData, setFormData] = useState({
    Subjek_Aspirasi: "",
    Target_Aspirasi: "",
    Jurusan_Dosen: "",
    Matakuliah_Dosen: "",
    Isi_Aspirasi: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input jika perlu
    if (!formData.Subjek_Aspirasi || !formData.Isi_Aspirasi) {
      setErrorMessage("Subjek dan Isi Aspirasi wajib diisi.");
      return;
    }

    // Kirim data aspirasi ke API
    fetch(`${API_URL}/kinerja_dosen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        setSuccessMessage(response.message);
        setFormData({
          Subjek_Aspirasi: "",
          Target_Aspirasi: "",
          Jurusan_Dosen: "",
          Matakuliah_Dosen: "",
          Isi_Aspirasi: "",
        });

        // Setelah 5 detik, hilangkan pesan sukses
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "600", fontFamily: "Gotham, sans-serif", color: "#000000", marginBottom: "16px" }}>Aspirasi Kinerja Dosen</h1>
      <p style={{ maxWidth: "600px", margin: "0 auto 40px", color: "#3E3E3E", fontFamily: "Gotham, sans-serif" }}>
        Sampaikan aspirasi Anda terkait dosen dengan mengisi form berikut secara objektif dan bijaksana.
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
          { label: "Subjek Aspirasi", name: "Subjek_Aspirasi", type: "text" },
          { label: "Target Aspirasi", name: "Target_Aspirasi", type: "text" },
          { label: "Jurusan Dosen", name: "Jurusan_Dosen", type: "text" },
          { label: "Mata Kuliah Dosen", name: "Matakuliah_Dosen", type: "text" },
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
            name="Isi_Aspirasi"
            value={formData.Isi_Aspirasi}
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

        <button className="custom-button" type="submit">
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

export default LaporanKinerjaDosen;