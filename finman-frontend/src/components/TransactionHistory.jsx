import { useEffect, useState } from 'react';
import api from '../services/api';

const TransactionHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Fetch history on load
        api.get('/trade/history')
            .then(res => setHistory(res.data))
            .catch(err => console.error("Error fetching history:", err));
    }, []);

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 mt-8 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-700 bg-slate-800/50">
                <h3 className="text-lg font-semibold text-white">Activity Log 📑</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-900/50">
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Action</th>
                            <th className="px-6 py-4">Asset</th>
                            <th className="px-6 py-4">Quantity</th>
                            <th className="px-6 py-4 text-right">Price Paid</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No recent activity found.</td>
                            </tr>
                        ) : (
                            history.map(tx => (
                                <tr key={tx.id} className="hover:bg-slate-700/20 transition">
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {new Date(tx.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            tx.type === 'BUY' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-rose-900/30 text-rose-400'
                                        }`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-100">{tx.symbol}</td>
                                    <td className="px-6 py-4 text-slate-300">{tx.quantity}</td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-300">
                                        ${tx.priceAtTransaction.toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;