import Navbar from '../components/Navbar';
import TransactionHistory from '../components/TransactionHistory';

const HistoryPage = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            <Navbar />
            <main className="max-w-7xl mx-auto p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white">Transaction Audit Log</h1>
                    <p className="text-slate-400 mt-2">A complete record of all your buy and sell orders.</p>
                </div>
                <TransactionHistory />
            </main>
        </div>
    );
};

export default HistoryPage;