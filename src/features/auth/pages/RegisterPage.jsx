import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthRegister } from '../states/authSlice';
import useInput from '../../../hooks/useInput';
import { showErrorDialog } from '../../../helpers/toolsHelper';

export default function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showErrorDialog('Semua kolom wajib diisi!');
      return;
    }
    
    const resultAction = await dispatch(isAuthRegister({ name, email, password }));
    if (isAuthRegister.fulfilled.match(resultAction)) {
      navigate('/auth/login');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Buat Akun Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input
            id="reg-name"
            name="name"
            type="text"
            value={name}
            onChange={onNameChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Masukkan nama lengkap"
          />
        </div>
        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="reg-email"
            name="email"
            type="email"
            value={email}
            onChange={onEmailChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Masukkan email"
          />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="reg-password"
            name="password"
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
          {loading ? 'Mendaftar...' : 'Daftar Akun'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link to="/auth/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
