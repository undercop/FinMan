import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Used to highlight the current page

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex justify-between items-center shadow-lg">
            {/* LEFT SIDE: Logo and Navigation Links */}
            <div className="flex items-center space-x-10">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚀</span>
                    <span className="text-xl font-bold tracking-tight text-white uppercase">Finman</span>
                </div>

                {/* NAV LINKS */}
                <div className="flex space-x-6">
                    <Link
                        to="/"
                        className={`text-sm font-medium transition-colors ${
                            location.pathname === '/' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/history"
                        className={`text-sm font-medium transition-colors ${
                            location.pathname === '/history' ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Activity History
                    </Link>
                </div>
            </div>

            {/* RIGHT SIDE: Balance and Profile */}
            <div className="flex items-center space-x-8">
                <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Available Balance</p>
                    <p className="text-lg font-mono text-emerald-400">
                        ${user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>

                <div className="h-10 w-px bg-slate-700"></div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium text-slate-200">{user?.name}</p>
                    <button
                        onClick={handleLogout}
                        className="bg-slate-700 hover:bg-rose-900/40 hover:text-rose-400 text-slate-300 px-4 py-2 rounded-lg text-sm transition-all border border-slate-600 font-semibold"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;