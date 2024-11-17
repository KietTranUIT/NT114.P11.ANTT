import "./header.css";

function Header() {
    return (
        <>
        <div className="navbar">
                <div className="navbar-content">
                <div className="navbar-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu text-body fs-5">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                    <a>TechStore</a>
                </div>
                <div className="navbar-right">
                    <div className="avatar">
                            <img src="https://res.cloudinary.com/dfgnimhoi/image/upload/v1731375811/brands/uqt9gebkizucgxlq71eh.jpg" alt="Avatar" />
                    </div>
                    <span style={{fontSize:"10px"}}>Welcome, Admin</span>
                </div>
                </div>
        </div>
        
        <div className="overwrite-header"></div>
        </>
    )
}

export default Header;