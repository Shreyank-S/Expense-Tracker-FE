document.addEventListener("DOMContentLoaded", fetchExpenses);

document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  fetch("http://localhost:3000/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: description,
      amount: amount,
      category: category,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      fetchExpenses();
    });
});

function fetchExpenses() {
  fetch("http://localhost:3000/expenses")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("expenseTableBody");
      tableBody.innerHTML = "";

      data.forEach((expense) => {
        const row = `
                    <tr>
                        <td>${expense.description}</td>
                        <td>${expense.amount}</td>
                        <td>${expense.category}</td>
                        <td class="actions">
                            <button onclick="deleteExpense(${expense.id})">Delete</button>
                        </td>
                    </tr>
                `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    });
}

function deleteExpense(id) {
  fetch(`http://localhost:3000/expenses/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      fetchExpenses();
    });
}
