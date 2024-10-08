document.addEventListener('DOMContentLoaded', () => {
    // Sample data for chart
    const salesData = [1000, 2000, 1500, 3000, 2000, 2500, 4000, 4500, 3500, 6000, 6500,7000];
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    // Create a chart using Chart.js 
    const salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales ($)',
                data: salesData,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: '#007bff',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }               
            }
        }
    });
});
