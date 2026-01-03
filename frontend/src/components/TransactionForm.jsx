import { useState } from "react";
import API from "../api";
export default function TransactionForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/transactions", {
      ...form,
      amount: Number(form.amount),
    });
    refresh();
  };

  return (
    <div className="card">
      <h3>Add Transaction</h3>
      <form onSubmit={submit} className="form-grid">
        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Food</option>
          <option>Rent</option>
          <option>Salary</option>
          <option>Shopping</option>
          <option>Travel</option>
        </select>
        <button>Add</button>
      </form>
    </div>
  );
}
