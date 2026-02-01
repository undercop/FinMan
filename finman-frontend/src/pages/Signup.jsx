import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', formData);
            alert("Account created successfully! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Email might already exist.');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
                <h2 className="text-3xl font-bold text-center text-white">Create Account 🚀</h2>

                {error && <div className="p-3 text-sm text-red-500 bg-red-900/20 rounded border border-red-900">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-2 text-white bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-2 text-white bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 mt-2 text-white bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-emerald-600 rounded hover:bg-emerald-700 transition">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-slate-400 text-sm">
                    Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;