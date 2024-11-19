import logo from "../assets/logoperu.png"

function Navbar() {
   return (
      <nav className = "w-full h-[77px] bg-redMain pt-4 pb-4">
         <div className="max-w-[1200px] mx-auto flex justify-between items-center">
            <figure>
               <img src={logo} alt="logo" className="h-[45px]"/>
            </figure>
            {/*<p className="text-white font-bold">DIRECCIÓN DE DERECHOS FUNDAMENTALES</p>*/}
         </div>

      </nav>
   );
}

export default Navbar;