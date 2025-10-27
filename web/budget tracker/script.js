const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('transaction-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
let transactions = [];

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('कृपया विवरण र रकम भर्नुहोस्');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value = '';
        amount.value = '';
    }
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'bg-red-200' : 'bg-green-200');
    item.classList.add('flex', 'justify-between', 'items-center', 'p-3', 'mb-2', 'rounded');
    item.innerHTML = `
        ${transaction.text} 
        <span class="font-semibold">${sign}NPR ${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="bg-red-500 text-white py-1 px-2 rounded text-xs hover:bg-red-600 transition" 
                onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expenseTotal = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    balance.innerText = `NPR ${total}`;
    income.innerText = `+NPR ${incomeTotal}`;
    expense.innerText = `-NPR ${Math.abs(expenseTotal)}`;
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);