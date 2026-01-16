const btn = document.getElementById("addBtn");
const amountInput = document.getElementById("amountInput");
const typeSelect = document.getElementById("typeSelect");
const output = document.getElementById("output");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const historyEl = document.getElementById("history");

let balance = 0;
let incomeTotal = 0;
let expenseTotal = 0;
let transactions = [];

btn.addEventListener("click", function () {
  const amount = amountInput.value;
  const type = typeSelect.value;

  output.classList.remove("text-red-500", "text-green-600");

  // validation
  if (amount === "") {
    output.textContent = "Please enter an amount";
    output.classList.add("text-red-500");
    return;
  }

  const amountNumber = Number(amount);

  // update totals
  if (type === "income") {
    incomeTotal += amountNumber;
    balance += amountNumber;
  } else {
    expenseTotal += amountNumber;
    balance -= amountNumber;
  }

  // store transaction
  transactions.push({
    type: type,
    amount: amountNumber
  });

  // update UI totals
  incomeEl.textContent = `Income: ${incomeTotal}`;
  expenseEl.textContent = `Expense: ${expenseTotal}`;
  balanceEl.textContent = `Balance: ${balance}`;

  output.textContent = `${type}: ${amountNumber}`;
  output.classList.add("text-green-600");

  // render history
  historyEl.innerHTML = ""; // clear old list

  transactions.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent =
      item.type === "income"
        ? `Income +${item.amount}`
        : `Expense -${item.amount}`;

    li.className =
      item.type === "income"
        ? "text-green-600"
        : "text-red-500";

    historyEl.appendChild(li);
  });

  amountInput.value = "";
});
