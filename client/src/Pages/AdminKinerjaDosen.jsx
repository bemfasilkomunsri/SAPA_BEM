import AdminDetail from "../Component/AdminDetail/kinerja_dosen";
import NavbarPages from "../Component/NavbarPages"

const AdminKinerjaDosen = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full ">
        <NavbarPages/>
        <AdminDetail />
      </div>
    </main>
  );
};

export default AdminKinerjaDosen