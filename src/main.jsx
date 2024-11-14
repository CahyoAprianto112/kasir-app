import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'; // Tambah Outlet untuk ganti-ganti halaman
import { Home, Sukses } from './pages';
import NavbarComponent from './components/NavbarComponent'; // Import Navbar lo

// Komponen App yang bersihin Navbar
// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <div>
      <NavbarComponent /> {/* Navbar tetap tampil */}
      <Outlet /> {/* Di sini kontennya ganti-ganti sesuai route */}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App ini bungkus Navbar dan halaman dinamis
    children: [
      {
        path: "/",
        element: <Home />, // Halaman Home
      },
      {
        path: "/sukses",
        element: <Sukses />, // Halaman Sukses
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
