import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const TradeForm = ({ onTradeSuccess }) => {
    const { refreshUser } = useAuth();
    const [symbol, setSymbol] = useState('AAPL');
    const [quantity, setQuantity] = useState(1);
    const [type, setType] = useState('BUY');
    const [estimatedPrice, setEstimatedPrice] = useState(0);

    // List of assets matching your DataInitializer
    const marketAssets = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 185.20 },
        { symbol: 'NVDA', name: 'Nvidia Corp.', price: 820.30 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 140.50 },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 175.00 },
        { symbol: 'MSFT', name: 'Microsoft', price: 410.00 },
        { symbol: 'GOLD', name: 'Gold Bullion', price: 2150.00 },
        { symbol: 'SLVR', name: 'Silver Metal', price: 24.50 },
        { symbol: 'T-BOND', name: 'US Treasury', price: 100.00 },
    ];

    // Update the estimated price when symbol changes
    useEffect(() => {
        const asset = marketAssets.find(a => a.symbol === symbol);
        if (asset) setEstimatedPrice(asset.price);
    }, [symbol]);

    const handleTrade = async (e) => {
        e.preventDefault();
        try {
            await api.post('/trade/execute', {
                symbol,
                quantity: Number(quantity),
                type
            });

            // 1. Refresh the Global Balance in Navbar
            await refreshUser();

            // 2. Refresh the Portfolio Table
            onTradeSuccess();

            alert(`Success: ${type} order for ${quantity} shares of ${symbol} completed.`);
        } catch (error) {
            alert(error.response?.data?.message || 'Trade execution failed');
        }
    };

    const totalCost = (estimatedPrice * quantity).toFixed(2);

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                Execution Terminal ⚡
            </h3>

            <form onSubmit={handleTrade} className="space-y-5">
                {/* ASSET SELECT */}
                <div>
                    <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Instrument</label>
                    <select
                        value={symbol}
                        onChange={e => setSymbol(e.target.value)}
                        className="w-full mt-2 bg-slate-900 border border-slate-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                    >
                        {marketAssets.map(asset => (
                            <option key={asset.symbol} value={asset.symbol}>
                                {asset.symbol} - {asset.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* QUANTITY INPUT */}
                <div>
                    <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Shares / Units</label>
                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        className="w-full mt-2 bg-slate-900 border border-slate-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* ESTIMATED TOTAL DISPLAY */}
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Est. Price:</span>
                        <span className="text-white font-mono">${estimatedPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span className="text-slate-400">Total {type === 'BUY' ? 'Cost' : 'Credit'}:</span>
                        <span className={`font-mono font-bold ${type === 'BUY' ? 'text-emerald-400' : 'text-blue-400'}`}>
                            ${totalCost}
                        </span>
                    </div>
                </div>

                {/* BUY/SELL TOGGLE */}
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                    <button
                        type="button"
                        onClick={() => setType('BUY')}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                            type === 'BUY'
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >BUY</button>
                    <button
                        type="button"
                        onClick={() => setType('SELL')}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                            type === 'SELL'
                            ? 'bg-rose-600 text-white shadow-lg'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >SELL</button>
                </div>

                <button
                    type="submit"
                    className={`w-full py-4 rounded-lg font-bold text-white shadow-xl transition-all active:scale-95 ${
                        type === 'BUY'
                        ? 'bg-emerald-600 hover:bg-emerald-500'
                        : 'bg-rose-600 hover:bg-rose-500'
                    }`}
                >
                    {type === 'BUY' ? 'Confirm Purchase' : 'Confirm Sale'}
                </button>
            </form>
        </div>
    );
};

export default TradeForm;