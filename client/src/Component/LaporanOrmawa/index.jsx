import { useState, useEffect } from "react";
import "./style.css";

function LaporanOrmawa() {
  const [laporan, setLaporan] = useState([]);
  const [formData, setFormData] = useState({
    Nama: "",
    NIM: "",
    Jurusan: "",
    Organisasi_yang_Dituju: "",
    Kritik_dan_Saran: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/ormawa`)
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

    if (!formData.Nama || !formData.Kritik_dan_Saran) {
      setErrorMessage("Nama dan Kritik/Saran wajib diisi.");
      return;
    }

    fetch(`${API_URL}/ormawa`, {
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
          Nama: "",
          NIM: "",
          Jurusan: "",
          Organisasi_yang_Dituju: "",
          Kritik_dan_Saran: "",
        });

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);

        return fetch(`${API_URL}/ormawa`);
      })
      .then((res) => res.json())
      .then((data) => setLaporan(data))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "600" }}>
        Aspirasi Organisasi Mahasiswa
      </h1>
      <p style={{ maxWidth: "600px", margin: "0 auto 40px", color: "#555" }}>
        Sampaikan aspirasi Anda kepada organisasi kemahasiswaan dengan jujur dan membangun.
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
          { label: "Nama", name: "Nama", type: "text" },
          { label: "NIM", name: "NIM", type: "text" },
          { label: "Jurusan", name: "Jurusan", type: "text" },
          { label: "Organisasi yang Dituju", name: "Organisasi_yang_Dituju", type: "text" }
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
          <label style={{ fontWeight: "500" }}>Kritik dan Saran</label>
          <textarea
            name="Kritik_dan_Saran"
            value={formData.Kritik_dan_Saran}
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
            ❌ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="alert success">
            ✅ {successMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default LaporanOrmawa;