import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaUserCog } from 'react-icons/fa';

export default function SidebarComponent() {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FaHome size={18} /> },
    { name: 'Pengguna', path: '/users', icon: <FaUsers size={18} /> },
    { name: 'Profil Saya', path: '/profile', icon: <FaUserCog size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 hidden md:flex flex-col pt-4">
      <div className="px-4 pb-4 border-b border-gray-100 mb-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu Utama</h2>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
