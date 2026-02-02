import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const PortfolioCharts = ({ assets }) => {
    // 1. Prepare data for Asset Type (e.g., STOCKS vs METALS)
    // Note: If your backend Asset model doesn't have 'category',
    // we can map it based on common symbols for now.
    const typeDataMap = assets.reduce((acc, asset) => {
        const type = (asset.symbol === 'GOLD' || asset.symbol === 'SLVR') ? 'Metals' :
                     (asset.symbol === 'T-BOND') ? 'Bonds' : 'Stocks';
        const value = asset.quantity * asset.currentMarketPrice;
        acc[type] = (acc[type] || 0) + value;
        return acc;
    }, {});

    const typeData = Object.keys(typeDataMap).map(key => ({
        name: key,
        value: typeDataMap[key]
    }));

    // 2. Prepare data for Symbol Concentration
    const symbolData = assets.map(asset => ({
        name: asset.symbol,
        value: asset.quantity * asset.currentMarketPrice
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 border border-slate-700 p-2 rounded shadow-lg">
                    <p className="text-white font-bold">{payload[0].name}</p>
                    <p className="text-blue-400">${payload[0].value.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Chart 1: Asset Type */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                <h3 className="text-slate-300 text-sm font-semibold uppercase mb-4">Asset Allocation</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={typeData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {typeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 2: Symbol Concentration */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                <h3 className="text-slate-300 text-sm font-semibold uppercase mb-4">Portfolio Concentration</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={symbolData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name}) => name}
                            >
                                {symbolData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PortfolioCharts;