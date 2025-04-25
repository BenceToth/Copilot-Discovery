window.onload = async () => {
    const usernameInput = document.getElementById('username');
    const downloadBtn = document.getElementById('downloadBtn');
    const emailBtn = document.getElementById('send-email');
    const chartTab = document.getElementById('chart-tab');
    const barChartCanvas = document.getElementById('barChart');

    // Fetch dummy data and update inputs
    try {
        const response = await fetch('http://localhost:3000/get-dummy-data');
        const data = await response.json();

        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];

        months.forEach((month, index) => {
            document.getElementById(`${month}-income`).value = data.income[index];
            document.getElementById(`${month}-expenses`).value = data.expenses[index];
        });

        // Populate chart data after fetching dummy data
        barChart.data.datasets[0].data = data.income;
        barChart.data.datasets[1].data = data.expenses;
        barChart.update();
    } catch (error) {
        console.error('Error fetching dummy data:', error);
    }

    // Validate username input
    /**
     * Validates the input value of a username field against a specific regex pattern
     * and updates the input field's border color based on the validation result.
     *
     * The username must meet the following criteria:
     * - At least one uppercase letter.
     * - At least one special character (!@#$%^&*).
     * - At least one digit.
     * - Minimum length of 8 characters.
     *
     * @function usernameInputCallback
     * @returns {void}
     */
    function usernameInputCallback() {
        const username = usernameInput.value;
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        usernameInput.style.borderColor = regex.test(username) ? 'green' : 'red';
    }
    usernameInput?.addEventListener('input', usernameInputCallback);

    // Download chart as an image
    downloadBtn?.addEventListener('click', () => {
        const image = barChartCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'chart.png';
        link.click();
    });

    emailBtn.addEventListener('click', async () => {
        const email = document.getElementById('email-address').value;
        if (!email || !validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
    
        const chartImage = barChartCanvas.toDataURL('image/png');
    
        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, chartImage }),
            });
    
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the email.');
        }
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