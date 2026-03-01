import Navbar from "../Component/Navbar";
import Home from "../Component/Home";
import About from "../Component/About";
import Laporan from "../Component/Laporan"
import Footer from "../Component/Footer";

const HomePage = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full">
        <Navbar />
        <Home />
        <About />
        <Laporan />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
