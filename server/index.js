// Memuat konfigurasi environment dari .env
require("dotenv").config();

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");

// Import package dan file konfigurasi
const express = require("express");
const cors = require("cors");

// Import koneksi database dan routes
const db = require("./config/db");
const kebijakanRoutes = require("./routes/kebijakanRoutes");
const seminarRoutes = require("./routes/seminarRoutes");
const fasilitasRoutes = require("./routes/fasilitasRoutes");
const dosenRoutes = require("./routes/dosenRoutes");
const ormawaRoutes = require("./routes/ormawaRoutes");
const UserRoute = require ("./routes/UserRoute.js");
const AuthRoute = require ("./routes/AuthRoute.js");

const app = express();

// Konfigurasi store session di DB
const store = new SequelizeStore({
  db: db,
  tableName: 'sessions'
});

// (async()=>{
//     await db.sync();

// })();

// Setup express-session
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
      secure: 'auto'
  }
}));

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyajikan file statis dari folder uploads
app.use("/uploads", express.static("uploads"));

// Menyambungkan routes ke aplikasi
app.use(UserRoute);
app.use('/api', AuthRoute);
app.use("/kebijakan_kampus", kebijakanRoutes);
app.use("/pengajuan_seminar", seminarRoutes);
app.use("/kerusakan_fasilitas", fasilitasRoutes);
app.use("/kinerja_dosen", dosenRoutes);
app.use("/ormawa", ormawaRoutes);


// store.sync();

// Menjalankan server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
