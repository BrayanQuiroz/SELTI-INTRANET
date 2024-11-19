import MainLayout from "../layouts/MainLayout.tsx";
import Login from "./login.tsx";

const Recuperar = () => {
   return (
      <MainLayout>
         <div className="w-full h-dvh flex flex-col items-center pt-16">
            <Login/>
         </div>
      </MainLayout>
   );
};

export default Recuperar;