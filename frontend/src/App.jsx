import { useEffect, useState } from "react";
import API from "./api";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Chart from "./components/Chart";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/transactions");
      setTransactions(res.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Expense Tracker Dashboard</h1>

      {/* Loading State */}
      {loading && <p>Loading data...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Main Content */}
      {!loading && !error && (
        <>
          <Balance transactions={transactions} />

          <div className="grid">
            <TransactionForm refresh={loadData} />
            <TransactionList transactions={transactions} />
          </div>

          {/* IMPORTANT: Render charts only when data exists */}
          {transactions.length > 0 ? (
            <Chart transactions={transactions} />
          ) : (
            <p style={{ marginTop: "20px" }}>
              No transactions yet. Add some to see analytics 📊
            </p>
          )}
        </>
      )}
    </div>
  );
}
