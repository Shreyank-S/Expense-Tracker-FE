let expenses = [];
let editingExpenseId = null;

document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (editingExpenseId !== null) {
    // Update existing expense
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === editingExpenseId
    );
    expenses[expenseIndex] = {
      id: editingExpenseId,
      description,
      amount,
      category,
    };
    editingExpenseId = null;
    document.getElementById("expenseForm").querySelector("button").textContent =
      "Add Expense";
  } else {
    // Add new expense
    const expense = {
      id: new Date().getTime(),
      description,
      amount,
      category,
    };
    expenses.push(expense);
  }

  document.getElementById("expenseForm").reset();
  renderExpenses();
});

function renderExpenses() {
  const tableBody = document.getElementById("expenseTableBody");
  tableBody.innerHTML = "";

  expenses.forEach((expense) => {
    const row = `
            <tr>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td class="actions">
                    <button class="edit" onclick="editExpense(${expense.id})">Edit</button>
                    <button class="delete" onclick="deleteExpense(${expense.id})">Delete</button>
                </td>
            </tr>
        `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  renderExpenses();
}

function editExpense(id) {
  const expense = expenses.find((expense) => expense.id === id);

  document.getElementById("description").value = expense.description;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("category").value = expense.category;

  editingExpenseId = id;
  document.getElementById("expenseForm").querySelector("button").textContent =
    "Update Expense";
}
