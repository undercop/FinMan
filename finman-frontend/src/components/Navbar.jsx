import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-2">
                <span className="text-2xl">🚀</span>
                <span className="text-xl font-bold tracking-tight text-white">FINMAN</span>
            </div>

            <div className="flex items-center space-x-8">
                <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-semibold">Available Balance</p>
                    <p className="text-lg font-mono text-emerald-400">${user?.balance?.toLocaleString()}</p>
                </div>

                <div className="h-10 w-px bg-slate-700"></div>

                <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium text-slate-200">{user?.name}</p>
                    <button
                        onClick={handleLogout}
                        className="bg-slate-700 hover:bg-red-900/40 hover:text-red-400 text-slate-300 px-4 py-2 rounded-lg text-sm transition-all border border-slate-600"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;