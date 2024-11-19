import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Recuperar from "./pages/Recuprar.tsx";

function App() {

  return (
    <Router>
       <MainLayout>
         <Routes>
           <Route path="/" element={<Home/>} />
            <Route path="/recuperar" element={<Recuperar/>} />
         </Routes>
       </MainLayout>
    </Router>
  )
}

export default App
