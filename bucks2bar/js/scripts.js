window.onload = () => {
    const usernameInput = document.getElementById('username');
    const downloadBtn = document.getElementById('downloadBtn');
    const chartTab = document.getElementById('chart-tab');
    const barChartCanvas = document.getElementById('barChart');

    // Validate username input
    usernameInput?.addEventListener('input', () => {
        const username = usernameInput.value;
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

        usernameInput.style.borderColor = regex.test(username) ? 'green' : 'red';
    });

    // Download chart as an image
    downloadBtn?.addEventListener('click', () => {
        const image = barChartCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'chart.png';
        link.click();
    });

    // Initialize bar chart
    const ctx = barChartCanvas.getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [
                {
                    label: 'Monthly Income',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Monthly Expenses',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
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

    // Update chart data on tab click
    chartTab?.addEventListener('click', () => {
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];

        const incomeData = months.map(month => parseFloat(document.getElementById(`${month}-income`)?.value) || 0);
        const expensesData = months.map(month => parseFloat(document.getElementById(`${month}-expenses`)?.value) || 0);

        barChart.data.datasets[0].data = incomeData;
        barChart.data.datasets[1].data = expensesData;
        barChart.update();
    });
};