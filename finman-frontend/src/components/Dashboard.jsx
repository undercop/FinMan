import { useEffect, useState } from 'react';
import api from '../services/api';
import TradeForm from './TradeForm';
import PortfolioCharts from './PortfolioCharts';

const Dashboard = () => {
    const [assets, setAssets] = useState([]);

    const fetchDashboard = () => {
        api.get('/portfolios/dashboard')
            .then(res => setAssets(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchDashboard();
        // Refresh every 5 seconds to keep the P/L and Charts live
        const interval = setInterval(fetchDashboard, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">
            {/* TOP SECTION: Analytics Charts */}
            {assets.length > 0 ? (
                <PortfolioCharts assets={assets} />
            ) : (
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center shadow-xl">
                    <p className="text-slate-400">Welcome! Execute your first trade to see portfolio analytics. 📊</p>
                </div>
            )}

            {/* BOTTOM SECTION: Table and Execution Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: Portfolio Table (Takes 2 columns) */}
                <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl self-start">
                    <div className="p-6 border-b border-slate-700 bg-slate-800/50">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            Your Holdings 💼
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-xs uppercase tracking-wider bg-slate-900/50">
                                    <th className="px-6 py-4">Asset</th>
                                    <th className="px-6 py-4">Quantity</th>
                                    <th className="px-6 py-4">Avg Price</th>
                                    <th className="px-6 py-4">Current Price</th>
                                    <th className="px-6 py-4 text-right">Profit/Loss</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {assets.map(asset => (
                                    <tr key={asset.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-100">{asset.symbol}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300 font-mono">{asset.quantity}</td>
                                        <td className="px-6 py-4 text-slate-300 font-mono">${asset.avgBuyPrice.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-blue-400 font-mono">${asset.currentMarketPrice.toFixed(2)}</td>
                                        <td className={`px-6 py-4 text-right font-mono font-bold ${asset.profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            <span className="flex items-center justify-end gap-1">
                                                {asset.profitLoss >= 0 ? '▲' : '▼'}
                                                ${Math.abs(asset.profitLoss).toLocaleString(undefined, {minimumFractionDigits: 2})}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {assets.length === 0 && (
                            <div className="p-16 text-center">
                                <p className="text-slate-500 italic">No assets found in your portfolio.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Trade Form */}
                <div className="space-y-6">
                    <TradeForm onTradeSuccess={fetchDashboard} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
