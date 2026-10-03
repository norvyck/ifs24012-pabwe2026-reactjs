import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthLayout() {
  const { token } = useSelector((state) => state.auth);

  // Pengalihan jika pengguna sudah terautentikasi
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8 tracking-tight">Lost & Founds</h1>
        <Outlet />
      </div>
    </div>
  );
}
