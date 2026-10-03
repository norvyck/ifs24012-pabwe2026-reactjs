import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthLogout } from '../../auth/states/authSlice';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function NavbarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(isAuthLogout());
    navigate('/auth/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-blue-600 tracking-tight">Lost & Founds</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {profile?.name || 'User'}
          </span>
          <img 
            src={profile?.avatar || `https://ui-avatars.com/api/?name=${profile?.name || 'U'}`} 
            alt="Avatar" 
            className="w-9 h-9 rounded-full border border-gray-200 object-cover"
          />
        </div>
        <button 
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Logout"
        >
          <FaSignOutAlt size={18} />
        </button>
      </div>
    </nav>
  );
}
