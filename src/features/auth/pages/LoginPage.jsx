import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthLogin } from '../states/authSlice';
import useInput from '../../../hooks/useInput';
import { showErrorDialog } from '../../../helpers/toolsHelper';

export default function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showErrorDialog('Email dan password tidak boleh kosong!');
      return;
    }
    dispatch(isAuthLogin({ email, password }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Masuk ke Akun Anda</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={onEmailChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Masukkan email"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Masukkan password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Sedang Masuk...' : 'Masuk'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link to="/auth/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
