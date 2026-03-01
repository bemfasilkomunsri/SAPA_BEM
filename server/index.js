require("dotenv").config();

const path = require("path");

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const db = require("./config/db");

const UserRoute = require("./routes/UserRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const fasilitasRoute = require("./routes/fasilitasRoutes.js");
const kebijakanRoute = require("./routes/kebijakanRoutes.js");
const ormawaRoute = require("./routes/ormawaRoutes.js");
const seminarRoute = require("./routes/seminarRoutes.js");
const dosenRoute = require("./routes/dosenRoutes.js");

const app = express();

app.set("trust proxy", 1);

const store = new SequelizeStore({
    db: db,
    tableName: "sessions",
});

store.sync();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://sapa.bemfasilkomunsri.org"
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// STATIC uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", AuthRoute);
app.use("/api", UserRoute);
app.use("/kerusakan_fasilitas", fasilitasRoute);
app.use("/kebijakan_kampus", kebijakanRoute);
app.use("/ormawa", ormawaRoute);
app.use("/pengajuan_seminar", seminarRoute);
app.use("/kinerja_dosen", dosenRoute);

app.get("/", (req, res) => {
    res.json({ msg: "API RUNNING" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});