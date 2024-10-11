import "./../styles/Dashboard.css";

const Dashboard = () => {
    return (
    <>
        <div className="Dashboard">
        <div class="sidebar">
        <h2>Dashboard</h2>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Settings</a></li>
        </ul>
    </div>

    <div class="main-content">
        <div class="top-bar">
            <h1>Welcome to Dashboard</h1>
            <div class="user-info">
                <p>User Name</p>
                <img src="https://via.placeholder.com/40" alt="User Avatar" />
            </div>
        </div>

        <div class="dashboard-content">
            <div class="card-container">
                <div class="card">
                    <h3>Total Users</h3>
                    <p>5,500</p>
                </div>
                <div class="card">
                    <h3>New Orders</h3>
                    <p>1,200</p>
                </div>
                <div class="card">
                    <h3>Revenue</h3>
                    <p>$12,340</p>
                </div>
                <div class="card">
                    <h3>Visitors</h3>
                    <p>23,000</p>
                </div>
            </div>

            <div class="chart-container">
                <h2>Statistics Overview</h2>
                <div class="chart-placeholder">
                    <p>Chart Placeholder</p>
                </div>
            </div>
        </div>
    </div>
        </div>
    </>
    );
}

export default Dashboard;