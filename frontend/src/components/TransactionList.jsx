export default function TransactionList({ transactions = [] }) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return (
      <div className="card">
        <h3>Transactions</h3>
        <p>No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Transactions</h3>

      <div className="transaction-list">
        {transactions.map((t) => {
          const isIncome = t.type === "income";

          return (
            <div
              key={t._id}
              className={`transaction-row ${isIncome ? "income" : "expense"}`}
            >
              <div className="left">
                <div className="title">{t.title || "Untitled"}</div>
                <div className="meta">
                  {t.category || "General"} •{" "}
                  {new Date(t.date).toLocaleDateString()}
                </div>
              </div>

              <div className="right">
                <span className="amount">
                  {isIncome ? "+" : "-"}₹{t.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
