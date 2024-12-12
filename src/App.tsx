import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import Recuperar from './pages/Recuprar.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { ProtectedRoute } from './utils/ProtectedRoute.tsx';
import Administrador from './pages/Admin/Administrador.tsx';
import GestionEdicion from './pages/Admin/GestionEdicion.tsx';
import UsuariosInternos from './pages/Admin/UsuariosInternos.tsx';

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
              element={
                <ProtectedRoute element={<Administrador />} roles={['ADMINISTRADOR']} />
              }
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
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
