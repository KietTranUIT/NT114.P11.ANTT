import React from 'react';
import './../styles/NotFound.css';

function NotFound() {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <h1>404</h1>
                <h2>Oops! Page not found</h2>
                <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
            </div>
        </div>
    );
}

export default NotFound;