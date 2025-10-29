import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import Nav from "./components/Nav";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetRequest from "./pages/ResetRequest";
import UpdatePassword from "./pages/UpdatePassword";

// Example protected page
function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>You're signed in ✅</p>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <div style={{ padding: 20 }}><h2>Welcome to FSL</h2><p>This is your home page.</p></div> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/reset", element: <ResetRequest /> },
      { path: "/update-password", element: <UpdatePassword /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/app", element: <Dashboard /> }],
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
