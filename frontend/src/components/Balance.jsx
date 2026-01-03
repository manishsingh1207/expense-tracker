export default function Balance({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="grid">
      <div className="card">
        💰 Income
        <br />
        <b>₹{income}</b>
      </div>
      <div className="card">
        💸 Expense
        <br />
        <b>₹{expense}</b>
      </div>
      <div className="card">
        📊 Balance
        <br />
        <b>₹{income - expense}</b>
      </div>
    </div>
  );
}
