const ctx = document.getElementById('sellsChart').getContext('2d');
    const sellsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['01 May', '05 May', '10 May', '15 May', '20 May', '25 May', '30 May'],
            datasets: [
                {
                    label: 'Sells',
                    data: [0, 20, 15, 30, 40, 35, 25],
                    borderColor: '#007bff',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Pending',
                    data: [10, 25, 20, 35, 30, 40, 30],
                    borderColor: '#74c0fc',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: '#e9ecef'
                    }
                },
                y: {
                    grid: {
                        display: true,
                        color: '#e9ecef'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });