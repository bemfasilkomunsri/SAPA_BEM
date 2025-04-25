import AdminDetail from "../Component/AdminDetail/kerusakan_fasilitas";
import NavbarPages from "../Component/NavbarPages";

const AdminKerusakanFasilitas = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:p-0 p-0">
      <div className="w-full ">
        <NavbarPages />
        <AdminDetail />
      </div>
    </main>
  );
};

export default AdminKerusakanFasilitas;