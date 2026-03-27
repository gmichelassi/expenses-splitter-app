"use client";

import { useState, useEffect } from "react";

type Person = {
  id: string;
  name: string;
};

type Expense = {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
};

type Settlement = {
  from: string;
  to: string;
  amount: number;
};

function calculateSettlements(people: Person[], expenses: Expense[]): Settlement[] {
  const balances: Record<string, number> = {};
  people.forEach((p) => (balances[p.id] = 0));

  expenses.forEach((expense) => {
    if (expense.splitAmong.length === 0) return;
    const share = expense.amount / expense.splitAmong.length;
    balances[expense.paidBy] = (balances[expense.paidBy] ?? 0) + expense.amount;
    expense.splitAmong.forEach((personId) => {
      balances[personId] = (balances[personId] ?? 0) - share;
    });
  });

  const debtors = Object.entries(balances)
    .filter(([, b]) => b < -0.001)
    .map(([id, b]) => ({ id, amount: -b }));
  const creditors = Object.entries(balances)
    .filter(([, b]) => b > 0.001)
    .map(([id, b]) => ({ id, amount: b }));

  const settlements: Settlement[] = [];
  let i = 0,
    j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debt = Math.min(debtors[i].amount, creditors[j].amount);
    settlements.push({
      from: debtors[i].id,
      to: creditors[j].id,
      amount: Math.round(debt * 100) / 100,
    });
    debtors[i].amount -= debt;
    creditors[j].amount -= debt;
    if (debtors[i].amount < 0.001) i++;
    if (creditors[j].amount < 0.001) j++;
  }

  return settlements;
}

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [activeTab, setActiveTab] = useState<"people" | "expenses" | "balances">("people");

  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePaidBy, setExpensePaidBy] = useState("");
  const [expenseSplitAmong, setExpenseSplitAmong] = useState<string[]>([]);
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    const savedPeople = localStorage.getItem("es_people");
    const savedExpenses = localStorage.getItem("es_expenses");
    if (savedPeople) setPeople(JSON.parse(savedPeople));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem("es_people", JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem("es_expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addPerson = () => {
    const name = newPersonName.trim();
    if (!name || people.find((p) => p.name.toLowerCase() === name.toLowerCase())) return;
    setPeople([...people, { id: crypto.randomUUID(), name }]);
    setNewPersonName("");
  };

  const removePerson = (id: string) => {
    setPeople(people.filter((p) => p.id !== id));
    setExpenses(
      expenses
        .filter((e) => e.paidBy !== id)
        .map((e) => ({ ...e, splitAmong: e.splitAmong.filter((pid) => pid !== id) }))
        .filter((e) => e.splitAmong.length > 0)
    );
  };

  const addExpense = () => {
    if (!expenseTitle.trim() || !expenseAmount || !expensePaidBy || expenseSplitAmong.length === 0) return;
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0) return;
    setExpenses([
      ...expenses,
      {
        id: crypto.randomUUID(),
        title: expenseTitle.trim(),
        amount,
        paidBy: expensePaidBy,
        splitAmong: expenseSplitAmong,
      },
    ]);
    setExpenseTitle("");
    setExpenseAmount("");
    setExpensePaidBy("");
    setExpenseSplitAmong([]);
    setShowAddExpense(false);
  };

  const removeExpense = (id: string) => setExpenses(expenses.filter((e) => e.id !== id));

  const settlements = calculateSettlements(people, expenses);
  const getPersonName = (id: string) => people.find((p) => p.id === id)?.name ?? "Unknown";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Expenses Splitter</h1>
        <p className="text-gray-500 mb-8">Track shared expenses and see who owes what</p>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {(["people", "expenses", "balances"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {tab === "people" && people.length > 0 && (
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {people.length}
                </span>
              )}
              {tab === "expenses" && expenses.length > 0 && (
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {expenses.length}
                </span>
              )}
              {tab === "balances" && settlements.length > 0 && (
                <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">
                  {settlements.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* People Tab */}
        {activeTab === "people" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPerson()}
                placeholder="Enter a name..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={addPerson}
                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Add Person
              </button>
            </div>
            {people.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
                <p className="text-gray-400">No people added yet. Add someone to get started.</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {people.map((person) => (
                  <li
                    key={person.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                        {person.name[0].toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{person.name}</span>
                    </div>
                    <button
                      onClick={() => removePerson(person.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <div className="space-y-4">
            {people.length < 2 ? (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-700">
                Add at least 2 people first before adding expenses.
              </div>
            ) : (
              <button
                onClick={() => setShowAddExpense(!showAddExpense)}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                {showAddExpense ? "Cancel" : "+ Add Expense"}
              </button>
            )}

            {showAddExpense && (
              <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">New Expense</h3>
                <input
                  type="text"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="What was it for? (e.g. Dinner)"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="Amount (e.g. 50.00)"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paid by</label>
                  <select
                    value={expensePaidBy}
                    onChange={(e) => setExpensePaidBy(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select who paid...</option>
                    {people.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Split among</label>
                  <div className="space-y-1">
                    {people.map((p) => (
                      <label key={p.id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={expenseSplitAmong.includes(p.id)}
                          onChange={(e) => {
                            if (e.target.checked) setExpenseSplitAmong([...expenseSplitAmong, p.id]);
                            else setExpenseSplitAmong(expenseSplitAmong.filter((id) => id !== p.id));
                          }}
                          className="rounded border-gray-300 text-indigo-600"
                        />
                        {p.name}
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  onClick={addExpense}
                  className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                >
                  Save Expense
                </button>
              </div>
            )}

            {expenses.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
                <p className="text-gray-400">No expenses yet. Add one above.</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {expenses.map((expense) => (
                  <li key={expense.id} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{expense.title}</p>
                        <p className="text-sm text-gray-500">
                          ${expense.amount.toFixed(2)} &middot; paid by {getPersonName(expense.paidBy)}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Split among: {expense.splitAmong.map(getPersonName).join(", ")}
                        </p>
                      </div>
                      <button
                        onClick={() => removeExpense(expense.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors text-sm ml-4 shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Balances Tab */}
        {activeTab === "balances" && (
          <div className="space-y-4">
            {expenses.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
                <p className="text-gray-400">Add expenses first to see who owes what.</p>
              </div>
            ) : settlements.length === 0 ? (
              <div className="rounded-lg bg-green-50 border border-green-200 p-6 text-center">
                <p className="text-green-700 font-medium">All settled up!</p>
                <p className="text-green-600 text-sm mt-1">Everyone is even.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  {settlements.length} payment{settlements.length > 1 ? "s" : ""} needed to settle up
                </p>
                <ul className="space-y-2">
                  {settlements.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900">{getPersonName(s.from)}</span>
                        <span className="text-gray-400 text-sm">owes</span>
                        <span className="font-medium text-gray-900">{getPersonName(s.to)}</span>
                      </div>
                      <span className="font-semibold text-indigo-600 ml-4">${s.amount.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {people.length > 0 && expenses.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Summary by person</h3>
                <ul className="space-y-2">
                  {people.map((person) => {
                    const paid = expenses
                      .filter((e) => e.paidBy === person.id)
                      .reduce((sum, e) => sum + e.amount, 0);
                    const share = expenses.reduce((sum, e) => {
                      if (e.splitAmong.includes(person.id)) return sum + e.amount / e.splitAmong.length;
                      return sum;
                    }, 0);
                    const net = paid - share;
                    return (
                      <li
                        key={person.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                            {person.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{person.name}</p>
                            <p className="text-xs text-gray-400">
                              paid ${paid.toFixed(2)} &middot; share ${share.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`font-semibold text-sm ${
                            net > 0.001 ? "text-green-600" : net < -0.001 ? "text-red-500" : "text-gray-400"
                          }`}
                        >
                          {net > 0.001 ? `+$${net.toFixed(2)}` : net < -0.001 ? `-$${Math.abs(net).toFixed(2)}` : "even"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
