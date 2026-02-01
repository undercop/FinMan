import { useState } from 'react';
import api from '../services/api';

const TradeForm = ({ onTradeSuccess }) => {
    const [symbol, setSymbol] = useState('AAPL');
    const [quantity, setQuantity] = useState(1);
    const [type, setType] = useState('BUY');

    const handleTrade = async (e) => {
        e.preventDefault();
        try {
            await api.post('/trade/execute', {
                symbol,
                quantity: Number(quantity),
                type
            });
            alert(`Order Filled: ${type} ${quantity} ${symbol} ✅`);
            onTradeSuccess();
        } catch (error) {
            // This now pulls the clean error message from your GlobalExceptionHandler
            alert(error.response?.data?.message || 'Trade Failed');
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                Execution Terminal ⚡
            </h3>

            <form onSubmit={handleTrade} className="space-y-5">
                {/* ASSET SELECT */}
                <div>
                    <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Select Asset</label>
                    <select
                        value={symbol}
                        onChange={e => setSymbol(e.target.value)}
                        className="w-full mt-2 bg-slate-900 border border-slate-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="AAPL">Apple (AAPL)</option>
                        <option value="GOOGL">Google (GOOGL)</option>
                        <option value="TSLA">Tesla (TSLA)</option>
                        <option value="GOLD">Gold (GOLD)</option>
                        <option value="SLVR">Silver (SLVR)</option>
                    </select>
                </div>

                {/* QUANTITY INPUT */}
                <div>
                    <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        className="w-full mt-2 bg-slate-900 border border-slate-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter quantity"
                    />
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
                    >BUY 🟢</button>
                    <button
                        type="button"
                        onClick={() => setType('SELL')}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                            type === 'SELL'
                            ? 'bg-rose-600 text-white shadow-lg'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >SELL 🔴</button>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className={`w-full py-4 rounded-lg font-bold text-white shadow-xl transition-all active:scale-95 ${
                        type === 'BUY'
                        ? 'bg-emerald-600 hover:bg-emerald-500'
                        : 'bg-rose-600 hover:bg-rose-500'
                    }`}
                >
                    Place {type} Order
                </button>
            </form>
        </div>
    );
};

export default TradeForm;