import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement, // ✅ REQUIRED
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

/* ✅ REGISTER EVERYTHING YOU USE */
ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement, // ✅ FIX
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Chart({ transactions = [] }) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return null;
  }

  const safe = transactions.filter(
    (t) => t && typeof t.amount === "number" && t.date
  );

  /* Income vs Expense */
  const income = safe
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = safe
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  /* Category Breakdown */
  const categoryMap = {};
  safe.forEach((t) => {
    const key = t.category || "Other";
    categoryMap[key] = (categoryMap[key] || 0) + t.amount;
  });

  const categories = Object.keys(categoryMap);
  const categoryTotals = Object.values(categoryMap);

  /* Daily Cash Flow */
  const dailyMap = {};
  safe.forEach((t) => {
    const date = new Date(t.date).toLocaleDateString();
    dailyMap[date] =
      (dailyMap[date] || 0) + (t.type === "income" ? t.amount : -t.amount);
  });

  const dates = Object.keys(dailyMap);
  const dailyTotals = Object.values(dailyMap);

  return (
    <div className="grid">
      <div className="card">
        <h3>Income vs Expense</h3>
        <Pie
          data={{
            labels: ["Income", "Expense"],
            datasets: [
              {
                data: [income, expense],
                backgroundColor: ["#22c55e", "#ef4444"],
              },
            ],
          }}
        />
      </div>

      <div className="card">
        <h3>Category Breakdown</h3>
        <Bar
          data={{
            labels: categories,
            datasets: [
              {
                label: "Amount",
                data: categoryTotals,
              },
            ],
          }}
        />
      </div>

      <div className="card">
        <h3>Daily Cash Flow</h3>
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                label: "Cash Flow",
                data: dailyTotals,
                borderWidth: 2,
                tension: 0.3,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
