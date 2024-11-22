import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Recuperar from "./pages/Recuprar.tsx";
import {AuthProvider} from "./context/AuthProvider.tsx";


function App() {

  return (
    <Router>
       <AuthProvider>
           <MainLayout>
             <Routes>
               <Route path="/" element={<Home/>} />
                <Route path="/recuperar" element={<Recuperar/>} />
             </Routes>
           </MainLayout>
       </AuthProvider>
    </Router>
  )
}

export default App
