import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import Recuperar from './pages/Recuprar.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { ProtectedRoute } from './utils/ProtectedRoute.tsx';
import Admin from './pages/Admin/Index.tsx';
import GestionEdicion from './pages/Admin/GestionEdicion.tsx';
import UsuariosInternos from './pages/Admin/UsuariosInternos.tsx';
import SeltiProceso from './pages/SeltiProceso';
import ViewPostulante from './pages/SeltiProceso/ViewPostulante.tsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/recuperar" element={<Recuperar />} />
            <Route
              path="/admin/"
              element={<ProtectedRoute element={<Admin />} roles={['ADMINISTRADOR']} />}
            >
              <Route
                path="/admin/gestionEdicion"
                element={
                  <ProtectedRoute
                    element={<GestionEdicion />}
                    roles={['ADMINISTRADOR']}
                  />
                }
              />
              <Route
                path="/admin/usuariosInternos"
                element={
                  <ProtectedRoute
                    element={<UsuariosInternos />}
                    roles={['ADMINISTRADOR']}
                  />
                }
              />
            </Route>
            <Route
              path="/seltiProceso/"
              element={
                <ProtectedRoute
                  element={<SeltiProceso />}
                  roles={['EQUIPO-TECNICO', 'SECRETARIA-TECNICA', 'AUDITOR-EXTERNO']}
                />
              }
            ></Route>
            <Route
              path="/seltiProceso/:hashCodpostul"
              element={
                <ProtectedRoute
                  element={<ViewPostulante />}
                  roles={['EQUIPO-TECNICO', 'SECRETARIA-TECNICA', 'AUDITOR-EXTERNO']}
                />
              }
            ></Route>
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
