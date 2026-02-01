import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/'); // Redirect to Dashboard
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
                <h2 className="text-3xl font-bold text-center text-white">Finman 🚀</h2>
                <h3 className="text-center text-slate-400">Sign in to your account</h3>

                {error && <div className="p-3 text-sm text-red-500 bg-red-900/20 rounded border border-red-900">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-2 text-white bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 mt-2 text-white bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center text-slate-400 text-sm mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;