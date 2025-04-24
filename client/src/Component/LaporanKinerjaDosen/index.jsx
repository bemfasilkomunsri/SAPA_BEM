import { useState, useEffect } from "react";
import "./style.css";

function LaporanKinerjaDosen() {
  const [laporan, setLaporan] = useState([]);
  const [formData, setFormData] = useState({
    Subjek_Aspirasi: "",
    Target_Aspirasi: "",
    Jurusan_Dosen: "",
    Matakuliah_Dosen: "",
    Isi_Aspirasi: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/kinerja_dosen")
      .then((res) => res.json())
      .then((data) => setLaporan(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/kinerja_dosen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
        setFormData({
          Subjek_Aspirasi: "",
          Target_Aspirasi: "",
          Jurusan_Dosen: "",
          Matakuliah_Dosen: "",
          Isi_Aspirasi: "",
        });
        return fetch("http://localhost:5000/kinerja_dosen");
      })
      .then((res) => res.json())
      .then((data) => setLaporan(data))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "600" }}>
        Aspirasi Kinerja Dosen
      </h1>
      <p style={{ maxWidth: "600px", margin: "0 auto 40px", color: "#555" }}>
        Sampaikan aspirasi Anda terkait dosen dengan mengisi form berikut secara
        objektif dan bijaksana.
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
      </form>
    </div>
  );
}

export default LaporanKinerjaDosen;