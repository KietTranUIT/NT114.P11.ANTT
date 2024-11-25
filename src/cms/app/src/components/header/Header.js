import "./header.css";

function Header() {
    return (
        <>
        <div className="navbar-header">
                <div className="navbar-content">
                <div className="navbar-left">
                    <img src="https://prium.github.io/phoenix/v1.18.0/assets/img/icons/logo.png" width='27px'></img>
                    <a style={{color: "#ef9454"}}>TechStore</a>
                </div>
                <div className="navbar-right">
                    <div className="avatar">
                            <img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1731375811/brands/uqt9gebkizucgxlq71eh.jpg" alt="Avatar" />
                    </div>
                    <span style={{fontSize:"12px"}}>Welcome, Admin</span>
                </div>
                </div>
        </div>
        <div className="overwrite-header"></div>
        </>
    )
}

export default Header;