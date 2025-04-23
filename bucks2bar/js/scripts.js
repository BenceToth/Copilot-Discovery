document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('barChart').getContext('2d');
    // Variables for monthly income
    const januaryIncome = parseFloat(document.getElementById('january-income').value) || 0;
    const februaryIncome = parseFloat(document.getElementById('february-income').value) || 0;
    const marchIncome = parseFloat(document.getElementById('march-income').value) || 0;
    const aprilIncome = parseFloat(document.getElementById('april-income').value) || 0;
    const mayIncome = parseFloat(document.getElementById('may-income').value) || 0;
    const juneIncome = parseFloat(document.getElementById('june-income').value) || 0;
    const julyIncome = parseFloat(document.getElementById('july-income').value) || 0;
    const augustIncome = parseFloat(document.getElementById('august-income').value) || 0;
    const septemberIncome = parseFloat(document.getElementById('september-income').value) || 0;
    const octoberIncome = parseFloat(document.getElementById('october-income').value) || 0;
    const novemberIncome = parseFloat(document.getElementById('november-income').value) || 0;
    const decemberIncome = parseFloat(document.getElementById('december-income').value) || 0;
    
    // Variables for monthly expenses
    const januaryExpenses = parseFloat(document.getElementById('january-expenses').value) || 0;
    const februaryExpenses = parseFloat(document.getElementById('february-expenses').value) || 0;
    const marchExpenses = parseFloat(document.getElementById('march-expenses').value) || 0;
    const aprilExpenses = parseFloat(document.getElementById('april-expenses').value) || 0;
    const mayExpenses = parseFloat(document.getElementById('may-expenses').value) || 0;
    const juneExpenses = parseFloat(document.getElementById('june-expenses').value) || 0;
    const julyExpenses = parseFloat(document.getElementById('july-expenses').value) || 0;
    const augustExpenses = parseFloat(document.getElementById('august-expenses').value) || 0;
    const septemberExpenses = parseFloat(document.getElementById('september-expenses').value) || 0;
    const octoberExpenses = parseFloat(document.getElementById('october-expenses').value) || 0;
    const novemberExpenses = parseFloat(document.getElementById('november-expenses').value) || 0;
    const decemberExpenses = parseFloat(document.getElementById('december-expenses').value) || 0;

    // Income and expenses arrays
    const incomeData = [
        januaryIncome, februaryIncome, marchIncome, aprilIncome, mayIncome, juneIncome,
        julyIncome, augustIncome, septemberIncome, octoberIncome, novemberIncome, decemberIncome
    ];

    const expensesData = [
        januaryExpenses, februaryExpenses, marchExpenses, aprilExpenses, mayExpenses, juneExpenses,
        julyExpenses, augustExpenses, septemberExpenses, octoberExpenses, novemberExpenses, decemberExpenses
    ];
    
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Monthly Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Monthly Expenses',
                data: expensesData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});